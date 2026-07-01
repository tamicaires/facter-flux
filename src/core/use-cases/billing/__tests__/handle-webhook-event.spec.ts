import { describe, it, expect, beforeEach } from 'vitest';
import { HandleWebhookEvent } from '../handle-webhook-event';
import { InMemorySubscriptionsRepository } from '@/tests/repositories/in-memory-subscriptions.repository';
import { FakePaymentService } from '@/tests/services/fake-payment.service';
import { makeSubscription } from '@/tests/factories/make-subscription';

let subscriptionsRepo: InMemorySubscriptionsRepository;
let paymentService: FakePaymentService;
let sut: HandleWebhookEvent;

describe('HandleWebhookEvent', () => {
  beforeEach(() => {
    subscriptionsRepo = new InMemorySubscriptionsRepository();
    paymentService = new FakePaymentService();
    sut = new HandleWebhookEvent(subscriptionsRepo, paymentService);
  });

  it('should create subscription on checkout.session.completed for new user', async () => {
    const event = {
      type: 'checkout.session.completed',
      data: {
        metadata: { userId: '00000000-0000-0000-0000-000000000001' },
        customer: 'cus_123',
        subscription: 'sub_123',
      },
    };

    await sut.execute({
      body: JSON.stringify(event),
      signature: 'test',
    });

    const subscription = await subscriptionsRepo.findByUserId('00000000-0000-0000-0000-000000000001');
    expect(subscription).not.toBeNull();
    expect(subscription?.plan).toBe('PRO');
    expect(subscription?.status).toBe('ACTIVE');
    expect(subscription?.stripeCustomerId).toBe('cus_123');
    expect(subscription?.stripeSubscriptionId).toBe('sub_123');
  });

  it('should update existing subscription on checkout.session.completed', async () => {
    await subscriptionsRepo.create(makeSubscription({
      userId: '00000000-0000-0000-0000-000000000001',
      plan: 'FREE',
      status: 'ACTIVE',
    }));

    const event = {
      type: 'checkout.session.completed',
      data: {
        metadata: { userId: '00000000-0000-0000-0000-000000000001' },
        customer: 'cus_456',
        subscription: 'sub_456',
      },
    };

    await sut.execute({
      body: JSON.stringify(event),
      signature: 'test',
    });

    const subscription = await subscriptionsRepo.findByUserId('00000000-0000-0000-0000-000000000001');
    expect(subscription?.plan).toBe('PRO');
    expect(subscription?.stripeCustomerId).toBe('cus_456');
  });

  it('should update subscription on customer.subscription.updated', async () => {
    await subscriptionsRepo.create(makeSubscription({
      userId: '00000000-0000-0000-0000-000000000001',
      plan: 'PRO',
      status: 'ACTIVE',
      stripeSubscriptionId: 'sub_123',
    }));

    const event = {
      type: 'customer.subscription.updated',
      data: {
        id: 'sub_123',
        status: 'past_due',
        cancel_at_period_end: true,
        current_period_end: Math.floor(Date.now() / 1000) + 86400,
        items: { data: [{ price: { id: 'price_pro' } }] },
      },
    };

    await sut.execute({
      body: JSON.stringify(event),
      signature: 'test',
    });

    const subscription = await subscriptionsRepo.findByUserId('00000000-0000-0000-0000-000000000001');
    expect(subscription?.status).toBe('PAST_DUE');
    expect(subscription?.cancelAtPeriodEnd).toBe(true);
    expect(subscription?.stripePriceId).toBe('price_pro');
  });

  it('should reset subscription on customer.subscription.deleted', async () => {
    await subscriptionsRepo.create(makeSubscription({
      userId: '00000000-0000-0000-0000-000000000001',
      plan: 'PRO',
      status: 'ACTIVE',
      stripeSubscriptionId: 'sub_123',
      stripeCustomerId: 'cus_123',
    }));

    const event = {
      type: 'customer.subscription.deleted',
      data: { id: 'sub_123' },
    };

    await sut.execute({
      body: JSON.stringify(event),
      signature: 'test',
    });

    const subscription = await subscriptionsRepo.findByUserId('00000000-0000-0000-0000-000000000001');
    expect(subscription?.plan).toBe('FREE');
    expect(subscription?.status).toBe('CANCELED');
    expect(subscription?.stripeSubscriptionId).toBeNull();
  });

  it('should mark subscription as PAST_DUE on invoice.payment_failed', async () => {
    await subscriptionsRepo.create(makeSubscription({
      userId: '00000000-0000-0000-0000-000000000001',
      plan: 'PRO',
      status: 'ACTIVE',
      stripeSubscriptionId: 'sub_123',
    }));

    const event = {
      type: 'invoice.payment_failed',
      data: { subscription: 'sub_123' },
    };

    await sut.execute({
      body: JSON.stringify(event),
      signature: 'test',
    });

    const subscription = await subscriptionsRepo.findByUserId('00000000-0000-0000-0000-000000000001');
    expect(subscription?.status).toBe('PAST_DUE');
  });
});
