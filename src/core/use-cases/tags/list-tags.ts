import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';

interface ListTagsRequest {
  userId: string;
  workspaceId?: string;
}

export class ListTags {
  constructor(private tagsRepository: TagsRepository) {}

  async execute(data: ListTagsRequest): Promise<Tag[]> {
    return this.tagsRepository.findAll(data.userId, data.workspaceId);
  }
}
