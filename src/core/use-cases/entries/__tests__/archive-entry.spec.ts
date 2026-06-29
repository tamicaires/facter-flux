import { describe, it, expect, beforeEach } from 'vitest';
import { ArchiveEntry } from '../archive-entry';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';
import { makeEntry } from '@/tests/factories/make-entry';

describe('ArchiveEntry', () => {
  let sut: ArchiveEntry;
  let entriesRepo: InMemoryEntriesRepository;

  beforeEach(() => {
    entriesRepo = new InMemoryEntriesRepository();
    sut = new ArchiveEntry(entriesRepo);
  });

  describe('success scenarios', () => {
    it('should archive an entry', async () => {
      const entry = makeEntry({ status: 'ACTIVE' });
      entriesRepo.items.push(entry);

      const updated = await sut.execute(entry.id);

      expect(updated.status).toBe('ARCHIVED');
    });
  });

  describe('error scenarios', () => {
    it('should throw EntryNotFoundError if entry does not exist', async () => {
      await expect(
        sut.execute('550e8400-e29b-41d4-a716-446655440000'),
      ).rejects.toThrow(EntryNotFoundError);
    });
  });
});
