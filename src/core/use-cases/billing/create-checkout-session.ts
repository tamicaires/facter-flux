import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';
import { PaymentService, type CheckoutSessionResult } from '@/core/domain/services/payment.service';

interface CreateCheckoutSessionRequest {
  userId: string;
  email: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export class CreateCheckoutSession {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private paymentService: PaymentService,
  ) {}

  async execute(data: CreateCheckoutSessionRequest): Promise<CheckoutSessionResult> {
    const subscription = await this.subscriptionsRepository.findByUserId(data.userId);

    return this.paymentService.createCheckoutSession({
      customerId: subscription?.stripeCustomerId ?? undefined,
      customerEmail: data.email,
      priceId: data.priceId,
      userId: data.userId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
    });
  }
}
