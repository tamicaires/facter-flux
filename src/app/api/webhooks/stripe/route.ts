import { NextRequest, NextResponse } from 'next/server';
import { makeHandleWebhookEvent } from '@/infra/container';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  try {
    const handleWebhookEvent = makeHandleWebhookEvent();
    await handleWebhookEvent.execute({ body, signature });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
