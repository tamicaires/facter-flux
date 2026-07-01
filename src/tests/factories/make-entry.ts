import { Entry, type EntryProps } from '@/core/domain/entities/entry';

export function makeEntry(overrides: Partial<EntryProps> = {}): Entry {
  return new Entry({
    content: 'Test entry content',
    type: 'NOTE',
    status: 'INBOX',
    userId: '00000000-0000-0000-0000-000000000001',
    ...overrides,
  });
}
