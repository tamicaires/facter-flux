'use client';

import { useMemo } from 'react';
import { Skeleton } from '@facter/ds-core';
import { useEntries } from '../hooks/use-entries';
import { EntryCard } from './entry-card';
import { DateSeparator } from './date-separator';
import { formatDateGroup, getDateKey } from '@/shared/utils/date.utils';
import type { EntryStatus, EntryType, SerializedEntry } from '@/shared/types/entry.types';

interface TimelineViewProps {
  workspaceId?: string;
  status?: EntryStatus;
  type?: EntryType;
  pinned?: boolean;
  meetingId?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
}

export function TimelineView({
  workspaceId,
  status,
  type,
  pinned,
  meetingId,
  emptyMessage = 'Nenhuma entrada',
  emptyIcon,
}: TimelineViewProps) {
  const { data, isLoading, error } = useEntries({
    workspaceId,
    status,
    type,
    pinned,
    meetingId,
  });

  const groupedEntries = useMemo(() => {
    if (!data?.data) return new Map<string, SerializedEntry[]>();

    const groups = new Map<string, SerializedEntry[]>();
    for (const entry of data.data) {
      const key = getDateKey(new Date(entry.createdAt));
      const existing = groups.get(key) ?? [];
      existing.push(entry);
      groups.set(key, existing);
    }
    return groups;
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 text-destructive">
        Erro ao carregar entradas
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {emptyIcon}
        <h3 className="text-lg font-medium text-muted-foreground mt-2">{emptyMessage}</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Use Ctrl+K para capturar algo
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {[...groupedEntries.entries()].map(([dateKey, entries]) => (
        <div key={dateKey} className="space-y-2">
          <DateSeparator label={formatDateGroup(new Date(dateKey))} />
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
}
