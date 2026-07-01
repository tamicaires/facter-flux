import { EnvironmentLink } from '@/core/domain/entities/environment-link';
import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';

interface ListEnvironmentLinksRequest {
  userId: string;
  workspaceId?: string;
}

export class ListEnvironmentLinks {
  constructor(private environmentLinksRepository: EnvironmentLinksRepository) {}

  async execute(data: ListEnvironmentLinksRequest): Promise<EnvironmentLink[]> {
    if (data.workspaceId) {
      return this.environmentLinksRepository.findByWorkspace(data.workspaceId, data.userId);
    }
    return this.environmentLinksRepository.findAll(data.userId);
  }
}
