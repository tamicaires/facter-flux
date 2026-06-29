import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';

export class DeleteEntry {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(id: string): Promise<void> {
    const entry = await this.entriesRepository.findById(id);
    if (!entry) {
      throw new EntryNotFoundError(id);
    }

    await this.entriesRepository.delete(id);
  }
}
