import { User } from '@/core/domain/entities/user';
import { UsersRepository } from '@/core/domain/repositories/users.repository';
import { HashService } from '@/core/domain/services/hash.service';
import { UserAlreadyExistsError } from '@/core/domain/errors';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUser {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(data: RegisterUserRequest): Promise<User> {
    const existing = await this.usersRepository.findByEmail(data.email);
    if (existing) {
      throw new UserAlreadyExistsError(data.email);
    }

    const hashedPassword = await this.hashService.hash(data.password);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return this.usersRepository.create(user);
  }
}
