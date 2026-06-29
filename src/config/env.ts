import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

function validateEnv() {
  const parsed = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!parsed.success) {
    console.error(
      'Invalid environment variables:',
      JSON.stringify(parsed.error.format(), null, 2),
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
