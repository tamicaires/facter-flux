'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardStatsAction } from '@/actions/entry.actions';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const result = await getDashboardStatsAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 30_000,
  });
}
