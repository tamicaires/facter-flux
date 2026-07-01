import { Subscription, type SubscriptionInput } from '@/core/domain/entities/subscription';

export function makeSubscription(overrides: Partial<SubscriptionInput> = {}): Subscription {
  return new Subscription({
    userId: '00000000-0000-0000-0000-000000000001',
    plan: 'FREE',
    status: 'ACTIVE',
    ...overrides,
  });
}
