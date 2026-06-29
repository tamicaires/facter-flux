import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateEntry } from '../update-entry';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { InMemoryTagsRepository } from '@/tests/repositories/in-memory-tags.repository';
import { EntryNotFoundError } from '@/core/domain/errors';
import { makeEntry } from '@/tests/factories/make-entry';

describe('UpdateEntry', () => {
  let sut: UpdateEntry;
  let entriesRepo: InMemoryEntriesRepository;
  let tagsRepo: InMemoryTagsRepository;

  beforeEach(() => {
    entriesRepo = new InMemoryEntriesRepository();
    tagsRepo = new InMemoryTagsRepository();
    sut = new UpdateEntry(entriesRepo, tagsRepo);
  });

  describe('success scenarios', () => {
    it('should update entry content', async () => {
      const entry = makeEntry();
      entriesRepo.items.push(entry);

      const updated = await sut.execute({
        id: entry.id,
        content: 'Updated content',
      });

      expect(updated.content).toBe('Updated content');
    });

    it('should update entry type', async () => {
      const entry = makeEntry();
      entriesRepo.items.push(entry);

      const updated = await sut.execute({
        id: entry.id,
        type: 'TASK',
      });

      expect(updated.type).toBe('TASK');
    });

    it('should update entry tags', async () => {
      const entry = makeEntry();
      entriesRepo.items.push(entry);

      await sut.execute({
        id: entry.id,
        tags: ['new-tag', 'another-tag'],
      });

      expect(tagsRepo.items).toHaveLength(2);
    });
  });

  describe('error scenarios', () => {
    it('should throw EntryNotFoundError if entry does not exist', async () => {
      await expect(
        sut.execute({
          id: '550e8400-e29b-41d4-a716-446655440000',
          content: 'Update',
        }),
      ).rejects.toThrow(EntryNotFoundError);
    });
  });
});
