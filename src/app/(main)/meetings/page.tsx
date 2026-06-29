'use client';

import { Calendar } from 'lucide-react';
import { useMeetings } from '@/features/meetings/hooks/use-meetings';
import { MeetingList } from '@/features/meetings/components/meeting-list';
import { Skeleton } from '@facter/ds-core';

export default function MeetingsPage() {
  const { data: meetings, isLoading } = useMeetings();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Reunioes</h1>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <MeetingList meetings={meetings ?? []} />
      )}
    </div>
  );
}
