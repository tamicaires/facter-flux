import { describe, it, expect, beforeEach } from 'vitest';
import { PinEntry } from '../pin-entry';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';
import { makeEntry } from '@/tests/factories/make-entry';

describe('PinEntry', () => {
  let sut: PinEntry;
  let entriesRepo: InMemoryEntriesRepository;

  beforeEach(() => {
    entriesRepo = new InMemoryEntriesRepository();
    sut = new PinEntry(entriesRepo);
  });

  describe('success scenarios', () => {
    it('should pin an unpinned entry', async () => {
      const entry = makeEntry({ pinned: false });
      entriesRepo.items.push(entry);

      const updated = await sut.execute({ id: entry.id, userId: '00000000-0000-0000-0000-000000000001' });

      expect(updated.pinned).toBe(true);
    });

    it('should unpin a pinned entry', async () => {
      const entry = makeEntry({ pinned: true });
      entriesRepo.items.push(entry);

      const updated = await sut.execute({ id: entry.id, userId: '00000000-0000-0000-0000-000000000001' });

      expect(updated.pinned).toBe(false);
    });
  });

  describe('error scenarios', () => {
    it('should throw EntryNotFoundError if entry does not exist', async () => {
      await expect(
        sut.execute({ id: '550e8400-e29b-41d4-a716-446655440000', userId: '00000000-0000-0000-0000-000000000001' }),
      ).rejects.toThrow(EntryNotFoundError);
    });
  });
});
