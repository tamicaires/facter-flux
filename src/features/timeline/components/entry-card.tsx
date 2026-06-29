'use client';

import { Pin } from 'lucide-react';
import { Card, CardContent, Badge } from '@facter/ds-core';
import { EntryCardNote } from './entry-card-note';
import { EntryCardLink } from './entry-card-link';
import { EntryCardTask } from './entry-card-task';
import { EntryCardSnippet } from './entry-card-snippet';
import { EntryActionsMenu } from './entry-actions-menu';
import { formatRelativeTime } from '@/shared/utils/date.utils';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface EntryCardProps {
  entry: SerializedEntry;
}

const TYPE_COLORS: Record<string, string> = {
  NOTE: 'bg-muted text-muted-foreground',
  LINK: 'bg-blue-500/10 text-blue-500',
  TASK: 'bg-green-500/10 text-green-500',
  SNIPPET: 'bg-purple-500/10 text-purple-500',
};

export function EntryCard({ entry }: EntryCardProps) {
  const renderContent = () => {
    switch (entry.type) {
      case 'LINK':
        return <EntryCardLink entry={entry} />;
      case 'TASK':
        return <EntryCardTask entry={entry} />;
      case 'SNIPPET':
        return <EntryCardSnippet entry={entry} />;
      default:
        return <EntryCardNote entry={entry} />;
    }
  };

  return (
    <Card className="group transition-colors hover:bg-accent/50">
      <CardContent className="p-4">
        <div className="space-y-3">
          {renderContent()}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className={`text-xs ${TYPE_COLORS[entry.type]}`}>
                {entry.type}
              </Badge>

              {entry.workspace && (
                <Badge
                  variant="secondary"
                  className="text-xs gap-1"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.workspace.color }}
                  />
                  {entry.workspace.name}
                </Badge>
              )}

              {entry.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  #{tag.name}
                </Badge>
              ))}

              {entry.pinned && (
                <Pin className="h-3 w-3 text-primary" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(new Date(entry.createdAt))}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <EntryActionsMenu entry={entry} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
