import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';

interface ArchiveEntryRequest {
  id: string;
  userId: string;
}

export class ArchiveEntry {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(data: ArchiveEntryRequest): Promise<Entry> {
    const entry = await this.entriesRepository.findById(data.id, data.userId);
    if (!entry) {
      throw new EntryNotFoundError(data.id);
    }

    entry.archive();
    return this.entriesRepository.update(entry);
  }
}
