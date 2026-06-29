import { z } from 'zod';

export const entrySchema = z.object({
  id: z.string().uuid().optional(),
  content: z.string().min(1),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).default('NOTE'),
  status: z.enum(['INBOX', 'ACTIVE', 'DONE', 'ARCHIVED']).default('INBOX'),
  workspaceId: z.string().uuid().nullable().optional(),
  assignee: z.string().nullable().optional(),
  pinned: z.boolean().default(false),
  metadata: z.record(z.unknown()).nullable().optional(),
  source: z.enum(['MANUAL', 'QUICK_CAPTURE', 'MEETING', 'IMPORT']).default('MANUAL'),
  meetingId: z.string().uuid().nullable().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type EntryProps = z.infer<typeof entrySchema>;
export type EntryInput = z.input<typeof entrySchema>;

export class Entry {
  id: string;
  content: string;
  type: 'NOTE' | 'LINK' | 'TASK' | 'SNIPPET';
  status: 'INBOX' | 'ACTIVE' | 'DONE' | 'ARCHIVED';
  workspaceId: string | null;
  assignee: string | null;
  pinned: boolean;
  metadata: Record<string, unknown> | null;
  source: 'MANUAL' | 'QUICK_CAPTURE' | 'MEETING' | 'IMPORT';
  meetingId: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: EntryInput) {
    const parsed = entrySchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.content = parsed.content;
    this.type = parsed.type;
    this.status = parsed.status;
    this.workspaceId = parsed.workspaceId ?? null;
    this.assignee = parsed.assignee ?? null;
    this.pinned = parsed.pinned;
    this.metadata = parsed.metadata ?? null;
    this.source = parsed.source;
    this.meetingId = parsed.meetingId ?? null;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }

  pin(): void {
    this.pinned = true;
    this.updatedAt = new Date();
  }

  unpin(): void {
    this.pinned = false;
    this.updatedAt = new Date();
  }

  archive(): void {
    this.status = 'ARCHIVED';
    this.updatedAt = new Date();
  }

  markDone(): void {
    this.status = 'DONE';
    this.updatedAt = new Date();
  }

  activate(workspaceId?: string): void {
    this.status = 'ACTIVE';
    if (workspaceId) {
      this.workspaceId = workspaceId;
    }
    this.updatedAt = new Date();
  }
}
