import { EnvironmentLink } from '../entities/environment-link';

export abstract class EnvironmentLinksRepository {
  abstract findById(id: string, userId: string): Promise<EnvironmentLink | null>;
  abstract findByWorkspace(workspaceId: string, userId: string): Promise<EnvironmentLink[]>;
  abstract findAll(userId: string): Promise<EnvironmentLink[]>;
  abstract create(link: EnvironmentLink): Promise<EnvironmentLink>;
  abstract delete(id: string, userId: string): Promise<void>;
  abstract countAll(userId: string): Promise<number>;
}
