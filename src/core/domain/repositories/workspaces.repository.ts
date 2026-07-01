import { Workspace } from '../entities/workspace';

export abstract class WorkspacesRepository {
  abstract findById(id: string, userId: string): Promise<Workspace | null>;
  abstract findBySlug(slug: string, userId: string): Promise<Workspace | null>;
  abstract findAll(userId: string): Promise<Workspace[]>;
  abstract create(workspace: Workspace): Promise<Workspace>;
  abstract update(workspace: Workspace): Promise<Workspace>;
  abstract delete(id: string, userId: string): Promise<void>;
}
