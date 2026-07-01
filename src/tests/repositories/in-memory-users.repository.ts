import { User } from '@/core/domain/entities/user';
import { UsersRepository } from '@/core/domain/repositories/users.repository';

export class InMemoryUsersRepository extends UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.items.find((u) => u.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((u) => u.email === email) ?? null;
  }

  async create(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.items.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.items[index] = user;
    }
    return user;
  }
}
