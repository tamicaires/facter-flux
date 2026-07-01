'use server';

import { z } from 'zod';
import {
  makeCreateCheckoutSession,
  makeCreatePortalSession,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { getSessionUser } from '@/lib/get-session-user';

const createCheckoutSchema = z.object({
  priceId: z.string().min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

const createPortalSchema = z.object({
  returnUrl: z.string().url(),
});

export async function createCheckoutAction(
  input: z.infer<typeof createCheckoutSchema>,
): Promise<ActionResult<{ url: string }>> {
  return handleAction(async () => {
    const { id: userId, email } = await getSessionUser();
    const data = createCheckoutSchema.parse(input);
    const useCase = makeCreateCheckoutSession();
    return useCase.execute({
      userId,
      email,
      priceId: data.priceId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
    });
  });
}

export async function createPortalAction(
  input: z.infer<typeof createPortalSchema>,
): Promise<ActionResult<{ url: string }>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = createPortalSchema.parse(input);
    const useCase = makeCreatePortalSession();
    return useCase.execute({
      userId,
      returnUrl: data.returnUrl,
    });
  });
}
