import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository, type EntryFilters, type DashboardStats } from '@/core/domain/repositories/entries.repository';
import type { PaginatedResult, PaginationParams } from '@/shared/types/common.types';

export class InMemoryEntriesRepository extends EntriesRepository {
  public items: Entry[] = [];
  public entryTags: Map<string, string[]> = new Map();

  async findById(id: string, userId: string): Promise<Entry | null> {
    return this.items.find((e) => e.id === id && e.userId === userId) ?? null;
  }

  async findMany(
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>> {
    let filtered = this.items.filter((e) => e.userId === filters.userId);

    if (filters.workspaceId) {
      filtered = filtered.filter((e) => e.workspaceId === filters.workspaceId);
    }
    if (filters.status) {
      filtered = filtered.filter((e) => e.status === filters.status);
    }
    if (filters.type) {
      filtered = filtered.filter((e) => e.type === filters.type);
    }
    if (filters.pinned !== undefined) {
      filtered = filtered.filter((e) => e.pinned === filters.pinned);
    }
    if (filters.meetingId) {
      filtered = filtered.filter((e) => e.meetingId === filters.meetingId);
    }

    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.perPage;
    const data = filtered.slice(start, start + pagination.perPage);

    return {
      data,
      total,
      page: pagination.page,
      perPage: pagination.perPage,
      totalPages: Math.ceil(total / pagination.perPage),
    };
  }

  async create(entry: Entry, tagIds?: string[]): Promise<Entry> {
    this.items.push(entry);
    if (tagIds) {
      this.entryTags.set(entry.id, tagIds);
    }
    return entry;
  }

  async update(entry: Entry, tagIds?: string[]): Promise<Entry> {
    const index = this.items.findIndex((e) => e.id === entry.id);
    if (index !== -1) {
      this.items[index] = entry;
    }
    if (tagIds) {
      this.entryTags.set(entry.id, tagIds);
    }
    return entry;
  }

  async delete(id: string, userId: string): Promise<void> {
    this.items = this.items.filter((e) => !(e.id === id && e.userId === userId));
    this.entryTags.delete(id);
  }

  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const userItems = this.items.filter((e) => e.userId === userId);
    const inboxCount = userItems.filter((e) => e.status === 'INBOX').length;
    const pinsCount = userItems.filter((e) => e.pinned).length;
    const activeTasksCount = userItems.filter((e) => e.type === 'TASK' && e.status === 'ACTIVE').length;
    return { inboxCount, pinsCount, activeTasksCount, linksCount: 0 };
  }

  async search(
    query: string,
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>> {
    const lower = query.toLowerCase();
    const result = await this.findMany(filters, { page: 1, perPage: 1000 });
    const filtered = result.data.filter((e) =>
      e.content.toLowerCase().includes(lower),
    );

    const total = filtered.length;
    const start = (pagination.page - 1) * pagination.perPage;
    const data = filtered.slice(start, start + pagination.perPage);

    return {
      data,
      total,
      page: pagination.page,
      perPage: pagination.perPage,
      totalPages: Math.ceil(total / pagination.perPage),
    };
  }
}
