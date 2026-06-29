'use client';

import { useQuery } from '@tanstack/react-query';
import { listTagsAction } from '@/actions/tag.actions';

export const tagKeys = {
  all: ['tags'] as const,
  list: (workspaceId?: string) => [...tagKeys.all, 'list', workspaceId] as const,
};

export function useTags(workspaceId?: string) {
  return useQuery({
    queryKey: tagKeys.list(workspaceId),
    queryFn: async () => {
      const result = await listTagsAction(workspaceId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}
