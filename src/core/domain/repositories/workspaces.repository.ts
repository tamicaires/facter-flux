import { Workspace } from '../entities/workspace';

export abstract class WorkspacesRepository {
  abstract findById(id: string): Promise<Workspace | null>;
  abstract findBySlug(slug: string): Promise<Workspace | null>;
  abstract findAll(): Promise<Workspace[]>;
  abstract create(workspace: Workspace): Promise<Workspace>;
  abstract update(workspace: Workspace): Promise<Workspace>;
  abstract delete(id: string): Promise<void>;
}
