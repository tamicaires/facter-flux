'use client';

import { Checkbox, Badge } from '@facter/ds-core';
import { useMarkDone } from '../hooks/use-entry-mutations';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface EntryCardTaskProps {
  entry: SerializedEntry;
}

export function EntryCardTask({ entry }: EntryCardTaskProps) {
  const markDone = useMarkDone();
  const isDone = entry.status === 'DONE';

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        checked={isDone}
        onCheckedChange={() => {
          if (!isDone) markDone.mutate(entry.id);
        }}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${isDone ? 'line-through text-muted-foreground' : ''}`}>
          {entry.content}
        </p>
        {entry.assignee && (
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {entry.assignee[0]}
            </div>
            <span className="text-xs text-muted-foreground">{entry.assignee}</span>
          </div>
        )}
      </div>
      {isDone && (
        <Badge variant="secondary" className="text-xs shrink-0">
          Concluido
        </Badge>
      )}
    </div>
  );
}
