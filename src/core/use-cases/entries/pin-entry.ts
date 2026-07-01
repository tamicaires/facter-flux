import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';

interface PinEntryRequest {
  id: string;
  userId: string;
}

export class PinEntry {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(data: PinEntryRequest): Promise<Entry> {
    const entry = await this.entriesRepository.findById(data.id, data.userId);
    if (!entry) {
      throw new EntryNotFoundError(data.id);
    }

    if (entry.pinned) {
      entry.unpin();
    } else {
      entry.pin();
    }

    return this.entriesRepository.update(entry);
  }
}
