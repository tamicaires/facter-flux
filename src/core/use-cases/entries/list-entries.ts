import { EntriesRepository, type EntryFilters } from '@/core/domain/repositories/entries.repository';
import type { PaginatedResult, PaginationParams } from '@/shared/types/common.types';
import { Entry } from '@/core/domain/entities/entry';

interface ListEntriesRequest {
  filters: EntryFilters;
  pagination: PaginationParams;
}

export class ListEntries {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(data: ListEntriesRequest): Promise<PaginatedResult<Entry>> {
    return this.entriesRepository.findMany(data.filters, data.pagination);
  }
}
