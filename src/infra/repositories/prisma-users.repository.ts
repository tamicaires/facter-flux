import { PrismaClient } from '@prisma/client';
import { User } from '@/core/domain/entities/user';
import { UsersRepository } from '@/core/domain/repositories/users.repository';

export class PrismaUsersRepository extends UsersRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): User {
    return new User({
      id: raw.id as string,
      name: raw.name as string | null,
      email: raw.email as string,
      emailVerified: raw.emailVerified as Date | null,
      image: raw.image as string | null,
      password: raw.password as string | null,
      createdAt: raw.createdAt as Date,
      updatedAt: raw.updatedAt as Date,
    });
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async create(user: User): Promise<User> {
    const raw = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        emailVerified: user.emailVerified,
        image: user.image,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async update(user: User): Promise<User> {
    const raw = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        emailVerified: user.emailVerified,
        image: user.image,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }
}
