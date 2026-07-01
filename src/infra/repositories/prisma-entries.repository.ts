import { PrismaClient, Prisma } from '@prisma/client';
import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository, type EntryFilters, type DashboardStats } from '@/core/domain/repositories/entries.repository';
import type { PaginatedResult, PaginationParams } from '@/shared/types/common.types';

export class PrismaEntriesRepository extends EntriesRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): Entry {
    return new Entry({
      id: raw.id as string,
      content: raw.content as string,
      type: raw.type as Entry['type'],
      status: raw.status as Entry['status'],
      workspaceId: raw.workspaceId as string | null,
      assignee: raw.assignee as string | null,
      pinned: raw.pinned as boolean,
      metadata: raw.metadata as Record<string, unknown> | null,
      source: raw.source as Entry['source'],
      meetingId: raw.meetingId as string | null,
      userId: raw.userId as string,
      createdAt: raw.createdAt as Date,
      updatedAt: raw.updatedAt as Date,
    });
  }

  private buildWhere(filters: EntryFilters) {
    const where: Record<string, unknown> = { userId: filters.userId };
    if (filters.workspaceId) where.workspaceId = filters.workspaceId;
    if (filters.status) where.status = filters.status;
    if (filters.type) where.type = filters.type;
    if (filters.pinned !== undefined) where.pinned = filters.pinned;
    if (filters.meetingId) where.meetingId = filters.meetingId;
    if (filters.tagIds && filters.tagIds.length > 0) {
      where.tags = { some: { tagId: { in: filters.tagIds } } };
    }
    return where;
  }

  async findById(id: string, userId: string): Promise<Entry | null> {
    const raw = await this.prisma.entry.findFirst({ where: { id, userId } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findMany(
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>> {
    const where = this.buildWhere(filters);
    const skip = (pagination.page - 1) * pagination.perPage;

    const [entries, total] = await Promise.all([
      this.prisma.entry.findMany({
        where,
        skip,
        take: pagination.perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: { include: { tag: true } },
          workspace: true,
        },
      }),
      this.prisma.entry.count({ where }),
    ]);

    return {
      data: entries.map((e) => this.toDomain(e as unknown as Record<string, unknown>)),
      total,
      page: pagination.page,
      perPage: pagination.perPage,
      totalPages: Math.ceil(total / pagination.perPage),
    };
  }

  async create(entry: Entry, tagIds?: string[]): Promise<Entry> {
    const raw = await this.prisma.entry.create({
      data: {
        id: entry.id,
        content: entry.content,
        type: entry.type,
        status: entry.status,
        workspaceId: entry.workspaceId,
        assignee: entry.assignee,
        pinned: entry.pinned,
        metadata: (entry.metadata as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        source: entry.source,
        meetingId: entry.meetingId,
        userId: entry.userId,
        tags: tagIds && tagIds.length > 0
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async update(entry: Entry, tagIds?: string[]): Promise<Entry> {
    if (tagIds) {
      await this.prisma.entryTag.deleteMany({ where: { entryId: entry.id } });
    }

    const raw = await this.prisma.entry.update({
      where: { id: entry.id },
      data: {
        content: entry.content,
        type: entry.type,
        status: entry.status,
        workspaceId: entry.workspaceId,
        assignee: entry.assignee,
        pinned: entry.pinned,
        metadata: (entry.metadata as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        source: entry.source,
        meetingId: entry.meetingId,
        updatedAt: new Date(),
        tags: tagIds
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.entry.deleteMany({ where: { id, userId } });
  }

  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const [inboxCount, pinsCount, activeTasksCount, linksCount] = await Promise.all([
      this.prisma.entry.count({ where: { userId, status: 'INBOX' } }),
      this.prisma.entry.count({ where: { userId, pinned: true } }),
      this.prisma.entry.count({ where: { userId, type: 'TASK', status: 'ACTIVE' } }),
      this.prisma.environmentLink.count({ where: { userId } }),
    ]);
    return { inboxCount, pinsCount, activeTasksCount, linksCount };
  }

  async search(
    query: string,
    filters: EntryFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Entry>> {
    const where = {
      ...this.buildWhere(filters),
      content: { contains: query, mode: 'insensitive' as const },
    };
    const skip = (pagination.page - 1) * pagination.perPage;

    const [entries, total] = await Promise.all([
      this.prisma.entry.findMany({
        where,
        skip,
        take: pagination.perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: { include: { tag: true } },
          workspace: true,
        },
      }),
      this.prisma.entry.count({ where }),
    ]);

    return {
      data: entries.map((e) => this.toDomain(e as unknown as Record<string, unknown>)),
      total,
      page: pagination.page,
      perPage: pagination.perPage,
      totalPages: Math.ceil(total / pagination.perPage),
    };
  }
}
