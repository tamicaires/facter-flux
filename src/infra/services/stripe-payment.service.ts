import Stripe from 'stripe';
import { PaymentService, type CheckoutSessionResult, type PortalSessionResult } from '@/core/domain/services/payment.service';
import { env } from '@/config/env';

export class StripePaymentService extends PaymentService {
  private _stripe: Stripe | null = null;

  private get stripe(): Stripe {
    if (!this._stripe) {
      this._stripe = new Stripe(env.STRIPE_SECRET_KEY ?? '');
    }
    return this._stripe;
  }

  async createCheckoutSession(params: {
    customerId?: string;
    customerEmail: string;
    priceId: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: params.customerId,
      customer_email: params.customerId ? undefined : params.customerEmail,
      line_items: [{ price: params.priceId, quantity: 1 }],
      metadata: { userId: params.userId },
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    });

    return { url: session.url ?? '' };
  }

  async createPortalSession(params: {
    customerId: string;
    returnUrl: string;
  }): Promise<PortalSessionResult> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: params.customerId,
      return_url: params.returnUrl,
    });

    return { url: session.url };
  }

  async constructWebhookEvent(
    body: string,
    signature: string,
  ): Promise<{ type: string; data: Record<string, unknown> }> {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET ?? '',
    );

    return {
      type: event.type,
      data: event.data.object as unknown as Record<string, unknown>,
    };
  }
}
