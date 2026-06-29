'use client';

import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, Badge } from '@facter/ds-core';
import { formatRelativeTime } from '@/shared/utils/date.utils';
import type { SerializedMeeting } from '@/shared/types/meeting.types';
import Link from 'next/link';

interface MeetingListProps {
  meetings: SerializedMeeting[];
}

function formatDuration(startedAt: string, endedAt: string | null): string {
  if (!endedAt) return 'Em andamento';
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime();
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}min`;
}

export function MeetingList({ meetings }: MeetingListProps) {
  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground/50 mb-2" />
        <h3 className="text-lg font-medium text-muted-foreground">Nenhuma reuniao</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Use Ctrl+M para iniciar uma reuniao
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {meetings.map((meeting) => (
        <Link key={meeting.id} href={`/meetings/${meeting.id}`}>
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{meeting.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatRelativeTime(new Date(meeting.startedAt))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(meeting.startedAt, meeting.endedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {meeting.workspace && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: meeting.workspace.color }}
                      />
                      {meeting.workspace.name}
                    </Badge>
                  )}
                  {!meeting.endedAt && (
                    <Badge variant="default" className="text-xs">
                      Ativo
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
