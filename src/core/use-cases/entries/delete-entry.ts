import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';

interface DeleteEntryRequest {
  id: string;
  userId: string;
}

export class DeleteEntry {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(data: DeleteEntryRequest): Promise<void> {
    const entry = await this.entriesRepository.findById(data.id, data.userId);
    if (!entry) {
      throw new EntryNotFoundError(data.id);
    }

    await this.entriesRepository.delete(data.id, data.userId);
  }
}
