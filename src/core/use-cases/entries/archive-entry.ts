import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';

export class ArchiveEntry {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(id: string): Promise<Entry> {
    const entry = await this.entriesRepository.findById(id);
    if (!entry) {
      throw new EntryNotFoundError(id);
    }

    entry.archive();
    return this.entriesRepository.update(entry);
  }
}
