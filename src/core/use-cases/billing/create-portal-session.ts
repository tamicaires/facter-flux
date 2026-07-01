import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';
import { PaymentService, type PortalSessionResult } from '@/core/domain/services/payment.service';
import { UnauthorizedError } from '@/core/domain/errors';

interface CreatePortalSessionRequest {
  userId: string;
  returnUrl: string;
}

export class CreatePortalSession {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private paymentService: PaymentService,
  ) {}

  async execute(data: CreatePortalSessionRequest): Promise<PortalSessionResult> {
    const subscription = await this.subscriptionsRepository.findByUserId(data.userId);
    if (!subscription?.stripeCustomerId) {
      throw new UnauthorizedError();
    }

    return this.paymentService.createPortalSession({
      customerId: subscription.stripeCustomerId,
      returnUrl: data.returnUrl,
    });
  }
}
