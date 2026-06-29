'use client';

import { use } from 'react';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge, Skeleton } from '@facter/ds-core';
import { useMeeting } from '@/features/meetings/hooks/use-meetings';
import { TimelineView } from '@/features/timeline/components/timeline-view';
import Link from 'next/link';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatDuration(startedAt: string, endedAt: string | null): string {
  if (!endedAt) return 'Em andamento';
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime();
  const minutes = Math.floor(ms / 60000);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}min`;
}

export default function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  const { id } = use(params);
  const { data: meeting, isLoading } = useMeeting(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">Reuniao nao encontrada</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/meetings"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Reunioes
        </Link>
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">{meeting.name}</h1>
          {!meeting.endedAt && (
            <Badge variant="default" className="text-xs">Ativo</Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDuration(meeting.startedAt, meeting.endedAt)}
          </span>
          {meeting.workspace && (
            <Badge variant="secondary" className="text-xs gap-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: meeting.workspace.color }}
              />
              {meeting.workspace.name}
            </Badge>
          )}
        </div>
      </div>

      <TimelineView meetingId={id} emptyMessage="Nenhuma entrada nesta reuniao" />
    </div>
  );
}
