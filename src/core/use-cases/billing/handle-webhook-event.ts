import { Subscription } from '@/core/domain/entities/subscription';
import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';
import { PaymentService } from '@/core/domain/services/payment.service';

interface HandleWebhookEventRequest {
  body: string;
  signature: string;
}

export class HandleWebhookEvent {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private paymentService: PaymentService,
  ) {}

  async execute(data: HandleWebhookEventRequest): Promise<void> {
    const event = await this.paymentService.constructWebhookEvent(data.body, data.signature);

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data);
        break;
    }
  }

  private async handleCheckoutCompleted(eventData: Record<string, unknown>): Promise<void> {
    const userId = (eventData.metadata as Record<string, string>)?.userId;
    const customerId = eventData.customer as string;
    const subscriptionId = eventData.subscription as string;

    if (!userId) return;

    const existing = await this.subscriptionsRepository.findByUserId(userId);

    if (existing) {
      existing.stripeCustomerId = customerId;
      existing.stripeSubscriptionId = subscriptionId;
      existing.plan = 'PRO';
      existing.status = 'ACTIVE';
      existing.updatedAt = new Date();
      await this.subscriptionsRepository.update(existing);
    } else {
      const subscription = new Subscription({
        userId,
        plan: 'PRO',
        status: 'ACTIVE',
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
      });
      await this.subscriptionsRepository.create(subscription);
    }
  }

  private async handleSubscriptionUpdated(eventData: Record<string, unknown>): Promise<void> {
    const stripeSubscriptionId = eventData.id as string;
    const subscription = await this.subscriptionsRepository.findByStripeSubscriptionId(stripeSubscriptionId);
    if (!subscription) return;

    const status = eventData.status as string;
    const cancelAtPeriodEnd = eventData.cancel_at_period_end as boolean;
    const currentPeriodEnd = eventData.current_period_end as number;
    const items = eventData.items as { data: Array<{ price: { id: string } }> };

    subscription.status = this.mapStripeStatus(status);
    subscription.cancelAtPeriodEnd = cancelAtPeriodEnd ?? false;
    subscription.currentPeriodEnd = currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null;
    subscription.stripePriceId = items?.data?.[0]?.price?.id ?? subscription.stripePriceId;
    subscription.updatedAt = new Date();

    await this.subscriptionsRepository.update(subscription);
  }

  private async handleSubscriptionDeleted(eventData: Record<string, unknown>): Promise<void> {
    const stripeSubscriptionId = eventData.id as string;
    const subscription = await this.subscriptionsRepository.findByStripeSubscriptionId(stripeSubscriptionId);
    if (!subscription) return;

    subscription.plan = 'FREE';
    subscription.status = 'CANCELED';
    subscription.stripeSubscriptionId = null;
    subscription.stripePriceId = null;
    subscription.currentPeriodEnd = null;
    subscription.cancelAtPeriodEnd = false;
    subscription.updatedAt = new Date();

    await this.subscriptionsRepository.update(subscription);
  }

  private async handlePaymentFailed(eventData: Record<string, unknown>): Promise<void> {
    const subscriptionId = eventData.subscription as string;
    if (!subscriptionId) return;

    const subscription = await this.subscriptionsRepository.findByStripeSubscriptionId(subscriptionId);
    if (!subscription) return;

    subscription.status = 'PAST_DUE';
    subscription.updatedAt = new Date();

    await this.subscriptionsRepository.update(subscription);
  }

  private mapStripeStatus(status: string): Subscription['status'] {
    switch (status) {
      case 'active': return 'ACTIVE';
      case 'canceled': return 'CANCELED';
      case 'past_due': return 'PAST_DUE';
      case 'trialing': return 'TRIALING';
      case 'incomplete': return 'INCOMPLETE';
      default: return 'ACTIVE';
    }
  }
}
