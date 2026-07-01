'use server';

import { z } from 'zod';
import { makeRegisterUser } from '@/infra/container';
import { signOut } from '@/lib/auth';
import { handleAction } from './helpers';
import type { ActionResult } from './types';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerAction(
  input: z.infer<typeof registerSchema>,
): Promise<ActionResult<{ id: string; email: string }>> {
  return handleAction(async () => {
    const data = registerSchema.parse(input);
    const useCase = makeRegisterUser();
    const user = await useCase.execute(data);
    return { id: user.id, email: user.email };
  });
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: '/auth/login' });
}
