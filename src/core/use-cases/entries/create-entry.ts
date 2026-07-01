import { Entry } from '@/core/domain/entities/entry';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';
import type { EntryType, EntryStatus, EntrySource, EntryMetadata } from '@/shared/types/entry.types';

interface CreateEntryRequest {
  content: string;
  type?: EntryType;
  status?: EntryStatus;
  workspaceId?: string | null;
  assignee?: string | null;
  metadata?: EntryMetadata | null;
  source?: EntrySource;
  meetingId?: string | null;
  tags?: string[];
  userId: string;
}

export class CreateEntry {
  constructor(
    private entriesRepository: EntriesRepository,
    private tagsRepository: TagsRepository,
  ) {}

  async execute(data: CreateEntryRequest): Promise<Entry> {
    const isMeetingCapture = !!data.meetingId;
    const defaultStatus = isMeetingCapture
      ? 'INBOX'
      : data.workspaceId ? 'ACTIVE' : 'INBOX';

    const entry = new Entry({
      content: data.content,
      type: data.type ?? 'NOTE',
      status: data.status ?? defaultStatus,
      workspaceId: data.workspaceId ?? null,
      assignee: data.assignee ?? null,
      metadata: (data.metadata as Record<string, unknown>) ?? null,
      source: data.source ?? 'MANUAL',
      meetingId: data.meetingId ?? null,
      userId: data.userId,
    });

    const tagIds: string[] = [];
    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        const tag = await this.tagsRepository.findOrCreate(tagName, data.userId, data.workspaceId);
        tagIds.push(tag.id);
      }
    }

    return this.entriesRepository.create(entry, tagIds);
  }
}
