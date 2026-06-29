'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchEntriesAction } from '@/actions/search.actions';

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useSearch(query: string) {
  const debouncedQuery = useDebouncedValue(query, 300);

  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      const result = await searchEntriesAction({ query: debouncedQuery, page: 1, perPage: 20 });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: debouncedQuery.length >= 2,
  });
}
