import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateUser } from '../authenticate-user';
import { InMemoryUsersRepository } from '@/tests/repositories/in-memory-users.repository';
import { FakeHashService } from '@/tests/services/fake-hash.service';
import { makeUser } from '@/tests/factories/make-user';
import { InvalidCredentialsError } from '@/core/domain/errors';

describe('AuthenticateUser', () => {
  let sut: AuthenticateUser;
  let usersRepo: InMemoryUsersRepository;
  let hashService: FakeHashService;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    hashService = new FakeHashService();
    sut = new AuthenticateUser(usersRepo, hashService);
  });

  describe('success scenarios', () => {
    it('should authenticate with valid credentials', async () => {
      const existing = makeUser({
        email: 'john@example.com',
        password: 'hashed:password123',
      });
      usersRepo.items.push(existing);

      const user = await sut.execute({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(user.id).toBe(existing.id);
      expect(user.email).toBe('john@example.com');
    });
  });

  describe('error scenarios', () => {
    it('should throw InvalidCredentialsError for wrong password', async () => {
      const existing = makeUser({
        email: 'john@example.com',
        password: 'hashed:correct-password',
      });
      usersRepo.items.push(existing);

      await expect(
        sut.execute({
          email: 'john@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError for non-existent user', async () => {
      await expect(
        sut.execute({
          email: 'nobody@example.com',
          password: 'password',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError for OAuth-only user (no password)', async () => {
      const oauthUser = makeUser({
        email: 'oauth@example.com',
        password: null,
      });
      usersRepo.items.push(oauthUser);

      await expect(
        sut.execute({
          email: 'oauth@example.com',
          password: 'anything',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
  });
});
