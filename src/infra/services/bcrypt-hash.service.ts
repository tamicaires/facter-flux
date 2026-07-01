import bcrypt from 'bcryptjs';
import { HashService } from '@/core/domain/services/hash.service';

const SALT_ROUNDS = 12;

export class BcryptHashService extends HashService {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, SALT_ROUNDS);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
