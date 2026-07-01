import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';

interface DeleteEnvironmentLinkRequest {
  id: string;
  userId: string;
}

export class DeleteEnvironmentLink {
  constructor(private environmentLinksRepository: EnvironmentLinksRepository) {}

  async execute(data: DeleteEnvironmentLinkRequest): Promise<void> {
    await this.environmentLinksRepository.delete(data.id, data.userId);
  }
}
