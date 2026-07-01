import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';

export class InMemoryTagsRepository extends TagsRepository {
  public items: Tag[] = [];

  async findById(id: string): Promise<Tag | null> {
    return this.items.find((t) => t.id === id) ?? null;
  }

  async findByName(name: string, userId: string, workspaceId?: string | null): Promise<Tag | null> {
    return (
      this.items.find(
        (t) =>
          t.name === name.toLowerCase() &&
          t.userId === userId &&
          t.workspaceId === (workspaceId ?? null),
      ) ?? null
    );
  }

  async findAll(userId: string, workspaceId?: string): Promise<Tag[]> {
    const userTags = this.items.filter((t) => t.userId === userId);
    if (workspaceId) {
      return userTags.filter(
        (t) => t.workspaceId === workspaceId || t.workspaceId === null,
      );
    }
    return [...userTags];
  }

  async create(tag: Tag): Promise<Tag> {
    this.items.push(tag);
    return tag;
  }

  async findOrCreate(name: string, userId: string, workspaceId?: string | null): Promise<Tag> {
    const existing = await this.findByName(name, userId, workspaceId);
    if (existing) return existing;

    const tag = new Tag({
      name,
      workspaceId: workspaceId ?? null,
      userId,
    });
    return this.create(tag);
  }
}
