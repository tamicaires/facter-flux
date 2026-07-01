import { auth } from '@/lib/auth';
import { UnauthorizedError } from '@/core/domain/errors';

export async function getSessionUser(): Promise<{
  id: string;
  name: string | null;
  email: string;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  return {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? '',
  };
}
