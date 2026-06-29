import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';

export class DeleteEnvironmentLink {
  constructor(private environmentLinksRepository: EnvironmentLinksRepository) {}

  async execute(id: string): Promise<void> {
    await this.environmentLinksRepository.delete(id);
  }
}
