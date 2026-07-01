import { Entry } from '../entities/entry';
import type { PaginatedResult, PaginationParams } from '@/shared/types/common.types';
import type { EntryStatus, EntryType } from '@/shared/types/entry.types';

export interface EntryFilters {
  userId: string;
  workspaceId?: string;
  status?: EntryStatus;
  type?: EntryType;
  pinned?: boolean;
  tagIds?: string[];
  search?: string;
  meetingId?: string;
}

export interface DashboardStats {
  inboxCount: number;
  pinsCount: number;
  activeTasksCount: number;
  linksCount: number;
}

export abstract class EntriesRepository {
  abstract findById(id: string, userId: string): Promise<Entry | null>;
  abstract findMany(
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>>;
  abstract create(entry: Entry, tagIds?: string[]): Promise<Entry>;
  abstract update(entry: Entry, tagIds?: string[]): Promise<Entry>;
  abstract delete(id: string, userId: string): Promise<void>;
  abstract search(
    query: string,
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>>;
  abstract getDashboardStats(userId: string): Promise<DashboardStats>;
}
