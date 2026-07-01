import { z } from 'zod';

export const subscriptionSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  plan: z.enum(['FREE', 'PRO', 'TEAM']).default('FREE'),
  status: z.enum(['ACTIVE', 'CANCELED', 'PAST_DUE', 'TRIALING', 'INCOMPLETE']).default('ACTIVE'),
  stripeCustomerId: z.string().nullable().optional(),
  stripeSubscriptionId: z.string().nullable().optional(),
  stripePriceId: z.string().nullable().optional(),
  currentPeriodEnd: z.date().nullable().optional(),
  cancelAtPeriodEnd: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type SubscriptionProps = z.infer<typeof subscriptionSchema>;
export type SubscriptionInput = z.input<typeof subscriptionSchema>;

export class Subscription {
  id: string;
  userId: string;
  plan: 'FREE' | 'PRO' | 'TEAM';
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' | 'INCOMPLETE';
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: SubscriptionInput) {
    const parsed = subscriptionSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.userId = parsed.userId;
    this.plan = parsed.plan;
    this.status = parsed.status;
    this.stripeCustomerId = parsed.stripeCustomerId ?? null;
    this.stripeSubscriptionId = parsed.stripeSubscriptionId ?? null;
    this.stripePriceId = parsed.stripePriceId ?? null;
    this.currentPeriodEnd = parsed.currentPeriodEnd ?? null;
    this.cancelAtPeriodEnd = parsed.cancelAtPeriodEnd;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }

  isActive(): boolean {
    return this.status === 'ACTIVE' || this.status === 'TRIALING';
  }

  isPro(): boolean {
    return this.plan === 'PRO' || this.plan === 'TEAM';
  }
}
