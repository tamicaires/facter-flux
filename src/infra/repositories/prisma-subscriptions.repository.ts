import { PrismaClient } from '@prisma/client';
import { Subscription } from '@/core/domain/entities/subscription';
import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';

export class PrismaSubscriptionsRepository extends SubscriptionsRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): Subscription {
    return new Subscription({
      id: raw.id as string,
      userId: raw.userId as string,
      plan: raw.plan as 'FREE' | 'PRO' | 'TEAM',
      status: raw.status as 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' | 'INCOMPLETE',
      stripeCustomerId: raw.stripeCustomerId as string | null,
      stripeSubscriptionId: raw.stripeSubscriptionId as string | null,
      stripePriceId: raw.stripePriceId as string | null,
      currentPeriodEnd: raw.currentPeriodEnd as Date | null,
      cancelAtPeriodEnd: raw.cancelAtPeriodEnd as boolean,
      createdAt: raw.createdAt as Date,
      updatedAt: raw.updatedAt as Date,
    });
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const raw = await this.prisma.subscription.findUnique({ where: { userId } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<Subscription | null> {
    const raw = await this.prisma.subscription.findUnique({ where: { stripeCustomerId } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription | null> {
    const raw = await this.prisma.subscription.findUnique({ where: { stripeSubscriptionId } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async create(subscription: Subscription): Promise<Subscription> {
    const raw = await this.prisma.subscription.create({
      data: {
        id: subscription.id,
        userId: subscription.userId,
        plan: subscription.plan,
        status: subscription.status,
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        stripePriceId: subscription.stripePriceId,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async update(subscription: Subscription): Promise<Subscription> {
    const raw = await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        plan: subscription.plan,
        status: subscription.status,
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        stripePriceId: subscription.stripePriceId,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }
}
