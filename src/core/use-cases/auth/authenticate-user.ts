import { User } from '@/core/domain/entities/user';
import { UsersRepository } from '@/core/domain/repositories/users.repository';
import { HashService } from '@/core/domain/services/hash.service';
import { InvalidCredentialsError } from '@/core/domain/errors';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(data: AuthenticateUserRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (!user.hasPassword()) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.hashService.compare(data.password, user.password!);
    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
