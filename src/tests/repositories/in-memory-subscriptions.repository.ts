import { Subscription } from '@/core/domain/entities/subscription';
import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';

export class InMemorySubscriptionsRepository extends SubscriptionsRepository {
  items: Subscription[] = [];

  async findByUserId(userId: string): Promise<Subscription | null> {
    return this.items.find((s) => s.userId === userId) ?? null;
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<Subscription | null> {
    return this.items.find((s) => s.stripeCustomerId === stripeCustomerId) ?? null;
  }

  async findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription | null> {
    return this.items.find((s) => s.stripeSubscriptionId === stripeSubscriptionId) ?? null;
  }

  async create(subscription: Subscription): Promise<Subscription> {
    this.items.push(subscription);
    return subscription;
  }

  async update(subscription: Subscription): Promise<Subscription> {
    const index = this.items.findIndex((s) => s.id === subscription.id);
    if (index >= 0) {
      this.items[index] = subscription;
    }
    return subscription;
  }
}
