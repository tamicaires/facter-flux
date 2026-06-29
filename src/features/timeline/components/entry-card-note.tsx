'use client';

import { FileText } from 'lucide-react';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface EntryCardNoteProps {
  entry: SerializedEntry;
}

export function EntryCardNote({ entry }: EntryCardNoteProps) {
  return (
    <div className="flex items-start gap-2">
      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <p className="text-sm leading-relaxed">{entry.content}</p>
    </div>
  );
}
