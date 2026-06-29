import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';

export class InMemoryTagsRepository extends TagsRepository {
  public items: Tag[] = [];

  async findById(id: string): Promise<Tag | null> {
    return this.items.find((t) => t.id === id) ?? null;
  }

  async findByName(name: string, workspaceId?: string | null): Promise<Tag | null> {
    return (
      this.items.find(
        (t) => t.name === name.toLowerCase() && t.workspaceId === (workspaceId ?? null),
      ) ?? null
    );
  }

  async findAll(workspaceId?: string): Promise<Tag[]> {
    if (workspaceId) {
      return this.items.filter(
        (t) => t.workspaceId === workspaceId || t.workspaceId === null,
      );
    }
    return [...this.items];
  }

  async create(tag: Tag): Promise<Tag> {
    this.items.push(tag);
    return tag;
  }

  async findOrCreate(name: string, workspaceId?: string | null): Promise<Tag> {
    const existing = await this.findByName(name, workspaceId);
    if (existing) return existing;

    const tag = new Tag({
      name,
      workspaceId: workspaceId ?? null,
    });
    return this.create(tag);
  }
}
