import { Tag, type TagProps } from '@/core/domain/entities/tag';

export function makeTag(overrides: Partial<TagProps> = {}): Tag {
  return new Tag({
    name: 'test-tag',
    ...overrides,
  });
}
