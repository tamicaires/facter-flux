import { Tag } from '../entities/tag';

export abstract class TagsRepository {
  abstract findById(id: string): Promise<Tag | null>;
  abstract findByName(name: string, userId: string, workspaceId?: string | null): Promise<Tag | null>;
  abstract findAll(userId: string, workspaceId?: string): Promise<Tag[]>;
  abstract create(tag: Tag): Promise<Tag>;
  abstract findOrCreate(name: string, userId: string, workspaceId?: string | null): Promise<Tag>;
}
