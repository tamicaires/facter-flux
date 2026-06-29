export type EntryType = 'NOTE' | 'LINK' | 'TASK' | 'SNIPPET';
export type EntryStatus = 'INBOX' | 'ACTIVE' | 'DONE' | 'ARCHIVED';
export type EntrySource = 'MANUAL' | 'QUICK_CAPTURE' | 'MEETING' | 'IMPORT';

export interface LinkMetadata {
  url: string;
  title?: string;
  favicon?: string;
  environment?: string;
  domain?: string;
  serviceName?: string;
}

export interface TaskMetadata {
  priority: 'low' | 'normal' | 'high' | 'urgent';
  dueDate?: string;
}

export interface SnippetMetadata {
  language?: string;
}

export type EntryMetadata = LinkMetadata | TaskMetadata | SnippetMetadata | Record<string, never>;

export interface SuggestionResult {
  type: EntryType;
  confidence: number;
  tags: string[];
  workspace?: string;
  assignee?: string;
  metadata?: Partial<EntryMetadata>;
  environment?: string;
}

export interface SerializedEntry {
  id: string;
  content: string;
  type: EntryType;
  status: EntryStatus;
  workspaceId: string | null;
  assignee: string | null;
  pinned: boolean;
  metadata: EntryMetadata | null;
  source: EntrySource;
  meetingId: string | null;
  createdAt: string;
  updatedAt: string;
  tags: Array<{ id: string; name: string; color: string | null }>;
  workspace: { id: string; name: string; slug: string; color: string } | null;
}
