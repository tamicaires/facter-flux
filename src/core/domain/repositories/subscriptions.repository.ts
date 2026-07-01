import { Subscription } from '../entities/subscription';

export abstract class SubscriptionsRepository {
  abstract findByUserId(userId: string): Promise<Subscription | null>;
  abstract findByStripeCustomerId(stripeCustomerId: string): Promise<Subscription | null>;
  abstract findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription | null>;
  abstract create(subscription: Subscription): Promise<Subscription>;
  abstract update(subscription: Subscription): Promise<Subscription>;
}
