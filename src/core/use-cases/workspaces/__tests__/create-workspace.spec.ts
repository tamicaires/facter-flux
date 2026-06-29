import { describe, it, expect, beforeEach } from 'vitest';
import { CreateWorkspace } from '../create-workspace';
import { InMemoryWorkspacesRepository } from '@/tests/repositories/in-memory-workspaces.repository';

describe('CreateWorkspace', () => {
  let sut: CreateWorkspace;
  let workspacesRepo: InMemoryWorkspacesRepository;

  beforeEach(() => {
    workspacesRepo = new InMemoryWorkspacesRepository();
    sut = new CreateWorkspace(workspacesRepo);
  });

  describe('success scenarios', () => {
    it('should create a workspace with auto-generated slug', async () => {
      const workspace = await sut.execute({
        name: 'Martech',
        color: '#3b82f6',
      });

      expect(workspace.name).toBe('Martech');
      expect(workspace.slug).toBe('martech');
      expect(workspace.color).toBe('#3b82f6');
      expect(workspacesRepo.items).toHaveLength(1);
    });

    it('should create workspace with icon', async () => {
      const workspace = await sut.execute({
        name: 'Facter',
        color: '#22c55e',
        icon: 'rocket',
      });

      expect(workspace.icon).toBe('rocket');
    });

    it('should handle duplicate slug by appending timestamp', async () => {
      await sut.execute({ name: 'Martech', color: '#3b82f6' });
      const second = await sut.execute({ name: 'Martech', color: '#ef4444' });

      expect(workspacesRepo.items).toHaveLength(2);
      expect(second.slug).toContain('martech-');
    });
  });
});
