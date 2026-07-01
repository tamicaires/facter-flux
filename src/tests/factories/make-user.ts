import { User, type UserProps } from '@/core/domain/entities/user';

export function makeUser(overrides: Partial<UserProps> = {}): User {
  return new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashed:password123',
    ...overrides,
  });
}
