import { describe, it, expect, beforeEach } from 'vitest';
import { CreateEntry } from '../create-entry';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { InMemoryTagsRepository } from '@/tests/repositories/in-memory-tags.repository';

describe('CreateEntry', () => {
  let sut: CreateEntry;
  let entriesRepo: InMemoryEntriesRepository;
  let tagsRepo: InMemoryTagsRepository;

  beforeEach(() => {
    entriesRepo = new InMemoryEntriesRepository();
    tagsRepo = new InMemoryTagsRepository();
    sut = new CreateEntry(entriesRepo, tagsRepo);
  });

  describe('success scenarios', () => {
    it('should create a NOTE entry with INBOX status by default', async () => {
      const entry = await sut.execute({ content: 'My first note', userId: '00000000-0000-0000-0000-000000000001' });

      expect(entry.content).toBe('My first note');
      expect(entry.type).toBe('NOTE');
      expect(entry.status).toBe('INBOX');
      expect(entry.userId).toBe('00000000-0000-0000-0000-000000000001');
      expect(entry.id).toBeDefined();
      expect(entriesRepo.items).toHaveLength(1);
    });

    it('should create a TASK entry with assignee', async () => {
      const entry = await sut.execute({
        content: 'Fix the login bug',
        type: 'TASK',
        assignee: 'Sobreira',
        userId: '00000000-0000-0000-0000-000000000001',
      });

      expect(entry.type).toBe('TASK');
      expect(entry.assignee).toBe('Sobreira');
    });

    it('should create a LINK entry with metadata', async () => {
      const entry = await sut.execute({
        content: 'https://argocd.martech.uat.example.com',
        type: 'LINK',
        metadata: {
          url: 'https://argocd.martech.uat.example.com',
          environment: 'uat',
        },
        userId: '00000000-0000-0000-0000-000000000001',
      });

      expect(entry.type).toBe('LINK');
      expect(entry.metadata).toEqual({
        url: 'https://argocd.martech.uat.example.com',
        environment: 'uat',
      });
    });

    it('should set status to ACTIVE when workspaceId is provided', async () => {
      const entry = await sut.execute({
        content: 'Entry with workspace',
        workspaceId: '550e8400-e29b-41d4-a716-446655440000',
        userId: '00000000-0000-0000-0000-000000000001',
      });

      expect(entry.status).toBe('ACTIVE');
      expect(entry.workspaceId).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should create tags via findOrCreate when tags are provided', async () => {
      await sut.execute({
        content: 'Note with tags',
        tags: ['argocd', 'deploy'],
        userId: '00000000-0000-0000-0000-000000000001',
      });

      expect(tagsRepo.items).toHaveLength(2);
      expect(tagsRepo.items[0].name).toBe('argocd');
      expect(tagsRepo.items[1].name).toBe('deploy');
      expect(entriesRepo.entryTags.size).toBe(1);
    });

    it('should not duplicate tags on findOrCreate', async () => {
      await sut.execute({ content: 'First note', tags: ['argocd'], userId: '00000000-0000-0000-0000-000000000001' });
      await sut.execute({ content: 'Second note', tags: ['argocd'], userId: '00000000-0000-0000-0000-000000000001' });

      expect(tagsRepo.items).toHaveLength(1);
    });
  });
});
