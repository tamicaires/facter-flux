import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from '@/infra/database/prisma';
import { PrismaUsersRepository } from '@/infra/repositories/prisma-users.repository';
import { BcryptHashService } from '@/infra/services/bcrypt-hash.service';
import { AuthenticateUser } from '@/core/use-cases/auth/authenticate-user';
import { authConfig } from './auth.config';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers.filter((p) => typeof p === 'function' || !('type' in p) || p.type !== 'credentials'),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          const usersRepo = new PrismaUsersRepository(prisma);
          const hashService = new BcryptHashService();
          const authenticateUser = new AuthenticateUser(usersRepo, hashService);
          const user = await authenticateUser.execute(parsed.data);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});
