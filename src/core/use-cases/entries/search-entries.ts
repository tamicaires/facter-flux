import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository, type EntryFilters } from '@/core/domain/repositories/entries.repository';
import type { PaginatedResult, PaginationParams } from '@/shared/types/common.types';

interface SearchEntriesRequest {
  query: string;
  filters: EntryFilters;
  pagination: PaginationParams;
}

export class SearchEntries {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(data: SearchEntriesRequest): Promise<PaginatedResult<Entry>> {
    return this.entriesRepository.search(data.query, data.filters, data.pagination);
  }
}
