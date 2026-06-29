import { EnvironmentLink } from '../entities/environment-link';

export abstract class EnvironmentLinksRepository {
  abstract findById(id: string): Promise<EnvironmentLink | null>;
  abstract findByWorkspace(workspaceId: string): Promise<EnvironmentLink[]>;
  abstract findAll(): Promise<EnvironmentLink[]>;
  abstract create(link: EnvironmentLink): Promise<EnvironmentLink>;
  abstract delete(id: string): Promise<void>;
}
