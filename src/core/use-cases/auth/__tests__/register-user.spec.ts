import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUser } from '../register-user';
import { InMemoryUsersRepository } from '@/tests/repositories/in-memory-users.repository';
import { FakeHashService } from '@/tests/services/fake-hash.service';
import { makeUser } from '@/tests/factories/make-user';
import { UserAlreadyExistsError } from '@/core/domain/errors';

describe('RegisterUser', () => {
  let sut: RegisterUser;
  let usersRepo: InMemoryUsersRepository;
  let hashService: FakeHashService;

  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    hashService = new FakeHashService();
    sut = new RegisterUser(usersRepo, hashService);
  });

  describe('success scenarios', () => {
    it('should register a new user with hashed password', async () => {
      const user = await sut.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.password).toBe('hashed:password123');
      expect(user.id).toBeDefined();
      expect(usersRepo.items).toHaveLength(1);
    });

    it('should generate a UUID id for the user', async () => {
      const user = await sut.execute({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'secret',
      });

      expect(user.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });
  });

  describe('error scenarios', () => {
    it('should throw UserAlreadyExistsError when email is taken', async () => {
      const existing = makeUser({ email: 'taken@example.com' });
      usersRepo.items.push(existing);

      await expect(
        sut.execute({
          name: 'Another',
          email: 'taken@example.com',
          password: 'password',
        }),
      ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });

    it('should throw on invalid email', async () => {
      await expect(
        sut.execute({
          name: 'Test',
          email: 'not-an-email',
          password: 'password',
        }),
      ).rejects.toThrow();
    });
  });
});
