'use client';

import { Code2 } from 'lucide-react';
import { Badge } from '@facter/ds-core';
import type { SerializedEntry, SnippetMetadata } from '@/shared/types/entry.types';

interface EntryCardSnippetProps {
  entry: SerializedEntry;
}

export function EntryCardSnippet({ entry }: EntryCardSnippetProps) {
  const meta = entry.metadata as SnippetMetadata | null;
  const content = entry.content.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Code2 className="h-4 w-4 text-muted-foreground" />
        {meta?.language && (
          <Badge variant="secondary" className="text-xs">
            {meta.language}
          </Badge>
        )}
      </div>
      <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs font-mono">
        <code>{content}</code>
      </pre>
    </div>
  );
}
