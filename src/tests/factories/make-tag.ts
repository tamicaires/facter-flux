import { Tag, type TagProps } from '@/core/domain/entities/tag';

export function makeTag(overrides: Partial<TagProps> = {}): Tag {
  return new Tag({
    name: 'test-tag',
    userId: '00000000-0000-0000-0000-000000000001',
    ...overrides,
  });
}
