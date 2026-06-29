'use client';

import { Star } from 'lucide-react';
import { TimelineView } from '@/features/timeline/components/timeline-view';

export default function PinsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Pins</h1>
      </div>
      <TimelineView
        pinned={true}
        emptyMessage="Nenhum pin"
        emptyIcon={<Star className="h-12 w-12 text-muted-foreground/50" />}
      />
    </div>
  );
}
