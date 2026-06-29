'use client';

import { useQuery } from '@tanstack/react-query';
import { listEntriesAction } from '@/actions/entry.actions';
import type { EntryStatus, EntryType } from '@/shared/types/entry.types';

export const entryKeys = {
  all: ['entries'] as const,
  list: (filters: Record<string, unknown>) => [...entryKeys.all, 'list', filters] as const,
  detail: (id: string) => [...entryKeys.all, 'detail', id] as const,
};

interface UseEntriesParams {
  workspaceId?: string;
  status?: EntryStatus;
  type?: EntryType;
  pinned?: boolean;
  meetingId?: string;
  page?: number;
  perPage?: number;
}

export function useEntries(params: UseEntriesParams = {}) {
  const { page = 1, perPage = 50, ...filters } = params;

  return useQuery({
    queryKey: entryKeys.list({ ...filters, page, perPage }),
    queryFn: async () => {
      const result = await listEntriesAction({
        ...filters,
        page,
        perPage,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 30_000,
  });
}
