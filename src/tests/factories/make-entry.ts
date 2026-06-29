import { Entry, type EntryProps } from '@/core/domain/entities/entry';

export function makeEntry(overrides: Partial<EntryProps> = {}): Entry {
  return new Entry({
    content: 'Test entry content',
    type: 'NOTE',
    status: 'INBOX',
    ...overrides,
  });
}
