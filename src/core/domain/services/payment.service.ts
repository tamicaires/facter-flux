export interface CheckoutSessionResult {
  url: string;
}

export interface PortalSessionResult {
  url: string;
}

export abstract class PaymentService {
  abstract createCheckoutSession(params: {
    customerId?: string;
    customerEmail: string;
    priceId: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutSessionResult>;

  abstract createPortalSession(params: {
    customerId: string;
    returnUrl: string;
  }): Promise<PortalSessionResult>;

  abstract constructWebhookEvent(
    body: string,
    signature: string,
  ): Promise<{
    type: string;
    data: Record<string, unknown>;
  }>;
}
