import { EnvironmentLink } from '@/core/domain/entities/environment-link';
import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { WorkspaceNotFoundError } from '@/core/domain/errors';

interface CreateEnvironmentLinkRequest {
  workspaceId: string;
  serviceName: string;
  environment: string;
  url: string;
  order?: number;
  userId: string;
}

export class CreateEnvironmentLink {
  constructor(
    private environmentLinksRepository: EnvironmentLinksRepository,
    private workspacesRepository: WorkspacesRepository,
  ) {}

  async execute(data: CreateEnvironmentLinkRequest): Promise<EnvironmentLink> {
    const workspace = await this.workspacesRepository.findById(data.workspaceId, data.userId);
    if (!workspace) {
      throw new WorkspaceNotFoundError(data.workspaceId);
    }

    const link = new EnvironmentLink({
      workspaceId: data.workspaceId,
      serviceName: data.serviceName,
      environment: data.environment,
      url: data.url,
      order: data.order ?? 0,
      userId: data.userId,
    });

    return this.environmentLinksRepository.create(link);
  }
}
