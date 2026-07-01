import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().nullable().optional(),
  email: z.string().email(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type UserProps = z.infer<typeof userSchema>;
export type UserInput = z.input<typeof userSchema>;

export class User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserInput) {
    const parsed = userSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.name = parsed.name ?? null;
    this.email = parsed.email;
    this.emailVerified = parsed.emailVerified ?? null;
    this.image = parsed.image ?? null;
    this.password = parsed.password ?? null;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }

  hasPassword(): boolean {
    return this.password !== null;
  }
}
