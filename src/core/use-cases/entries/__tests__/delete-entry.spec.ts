import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteEntry } from '../delete-entry';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { EntryNotFoundError } from '@/core/domain/errors';
import { makeEntry } from '@/tests/factories/make-entry';

describe('DeleteEntry', () => {
  let sut: DeleteEntry;
  let entriesRepo: InMemoryEntriesRepository;

  beforeEach(() => {
    entriesRepo = new InMemoryEntriesRepository();
    sut = new DeleteEntry(entriesRepo);
  });

  describe('success scenarios', () => {
    it('should delete an entry', async () => {
      const entry = makeEntry();
      entriesRepo.items.push(entry);

      await sut.execute({ id: entry.id, userId: '00000000-0000-0000-0000-000000000001' });

      expect(entriesRepo.items).toHaveLength(0);
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
