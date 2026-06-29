import { Workspace } from '@/core/domain/entities/workspace';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';

export class InMemoryWorkspacesRepository extends WorkspacesRepository {
  public items: Workspace[] = [];

  async findById(id: string): Promise<Workspace | null> {
    return this.items.find((w) => w.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    return this.items.find((w) => w.slug === slug) ?? null;
  }

  async findAll(): Promise<Workspace[]> {
    return [...this.items].sort((a, b) => a.name.localeCompare(b.name));
  }

  async create(workspace: Workspace): Promise<Workspace> {
    this.items.push(workspace);
    return workspace;
  }

  async update(workspace: Workspace): Promise<Workspace> {
    const index = this.items.findIndex((w) => w.id === workspace.id);
    if (index !== -1) {
      this.items[index] = workspace;
    }
    return workspace;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((w) => w.id !== id);
  }
}
