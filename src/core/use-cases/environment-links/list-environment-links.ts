import { EnvironmentLink } from '@/core/domain/entities/environment-link';
import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';

export class ListEnvironmentLinks {
  constructor(private environmentLinksRepository: EnvironmentLinksRepository) {}

  async execute(workspaceId?: string): Promise<EnvironmentLink[]> {
    if (workspaceId) {
      return this.environmentLinksRepository.findByWorkspace(workspaceId);
    }
    return this.environmentLinksRepository.findAll();
  }
}
