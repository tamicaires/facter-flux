import { PaymentService, type CheckoutSessionResult, type PortalSessionResult } from '@/core/domain/services/payment.service';

export class FakePaymentService extends PaymentService {
  async createCheckoutSession(): Promise<CheckoutSessionResult> {
    return { url: 'https://checkout.stripe.com/test-session' };
  }

  async createPortalSession(): Promise<PortalSessionResult> {
    return { url: 'https://billing.stripe.com/test-portal' };
  }

  async constructWebhookEvent(
    body: string,
  ): Promise<{ type: string; data: Record<string, unknown> }> {
    return JSON.parse(body);
  }
}
