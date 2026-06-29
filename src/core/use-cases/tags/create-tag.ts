import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';
import { DuplicateTagError } from '@/core/domain/errors';

interface CreateTagRequest {
  name: string;
  color?: string | null;
  workspaceId?: string | null;
}

export class CreateTag {
  constructor(private tagsRepository: TagsRepository) {}

  async execute(data: CreateTagRequest): Promise<Tag> {
    const existing = await this.tagsRepository.findByName(data.name, data.workspaceId ?? null);
    if (existing) {
      throw new DuplicateTagError(data.name);
    }

    const tag = new Tag({
      name: data.name,
      color: data.color ?? null,
      workspaceId: data.workspaceId ?? null,
    });

    return this.tagsRepository.create(tag);
  }
}
