import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';

export class ListTags {
  constructor(private tagsRepository: TagsRepository) {}

  async execute(workspaceId?: string): Promise<Tag[]> {
    return this.tagsRepository.findAll(workspaceId);
  }
}
