import { HashService } from '@/core/domain/services/hash.service';

export class FakeHashService extends HashService {
  async hash(value: string): Promise<string> {
    return `hashed:${value}`;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return hash === `hashed:${value}`;
  }
}
