import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';
import { EntryNotFoundError } from '@/core/domain/errors';
import type { EntryType, EntryStatus, EntryMetadata } from '@/shared/types/entry.types';

interface UpdateEntryRequest {
  id: string;
  content?: string;
  type?: EntryType;
  status?: EntryStatus;
  workspaceId?: string | null;
  assignee?: string | null;
  metadata?: EntryMetadata | null;
  tags?: string[];
}

export class UpdateEntry {
  constructor(
    private entriesRepository: EntriesRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async execute(data: UpdateEntryRequest): Promise<Entry> {
    const entry = await this.entriesRepository.findById(data.id);
    if (!entry) {
      throw new EntryNotFoundError(data.id);
    }

    if (data.content !== undefined) entry.content = data.content;
    if (data.type !== undefined) entry.type = data.type;
    if (data.status !== undefined) entry.status = data.status;
    if (data.workspaceId !== undefined) entry.workspaceId = data.workspaceId;
    if (data.assignee !== undefined) entry.assignee = data.assignee;
    if (data.metadata !== undefined) entry.metadata = data.metadata as Record<string, unknown> | null;
    entry.updatedAt = new Date();

    let tagIds: string[] | undefined;
    if (data.tags) {
      tagIds = [];
      for (const tagName of data.tags) {
        const tag = await this.tagsRepository.findOrCreate(tagName, entry.workspaceId);
        tagIds.push(tag.id);
      }
    }

    return this.entriesRepository.update(entry, tagIds);
  }
}
