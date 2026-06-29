'use client';

import { ExternalLink } from 'lucide-react';
import { Badge } from '@facter/ds-core';
import type { SerializedEntry, LinkMetadata } from '@/shared/types/entry.types';
import { ENVIRONMENT_COLORS } from '@/shared/constants/environment-patterns';

interface EntryCardLinkProps {
  entry: SerializedEntry;
}

export function EntryCardLink({ entry }: EntryCardLinkProps) {
  const meta = entry.metadata as LinkMetadata | null;
  const url = meta?.url ?? entry.content;
  const title = meta?.title;
  const env = meta?.environment;

  return (
    <div className="space-y-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-sm text-primary hover:underline"
      >
        {meta?.favicon && (
          <img
            src={meta.favicon}
            alt=""
            className="h-4 w-4 rounded"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <span className="truncate">{title ?? url}</span>
        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      {env && (
        <Badge
          variant="outline"
          className="text-xs"
          style={{ borderColor: ENVIRONMENT_COLORS[env] ?? undefined }}
        >
          {env.toUpperCase()}
        </Badge>
      )}
      {title && (
        <p className="text-xs text-muted-foreground truncate">{url}</p>
      )}
    </div>
  );
}
