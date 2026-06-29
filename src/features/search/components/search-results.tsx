'use client';

import { Loader2 } from 'lucide-react';
import { EntryCard } from '@/features/timeline/components/entry-card';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface SearchResultsProps {
  entries: SerializedEntry[];
  isLoading: boolean;
  query: string;
}

export function SearchResults({ entries, isLoading, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (query.length < 2) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Digite pelo menos 2 caracteres para buscar
      </p>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhum resultado para &quot;{query}&quot;
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        {entries.length} resultado{entries.length !== 1 ? 's' : ''}
      </p>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
