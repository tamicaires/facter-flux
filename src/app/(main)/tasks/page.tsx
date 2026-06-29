'use client';

import { CheckSquare } from 'lucide-react';
import { TimelineView } from '@/features/timeline/components/timeline-view';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckSquare className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Tasks</h1>
      </div>
      <TimelineView
        type="TASK"
        emptyMessage="Nenhuma task"
        emptyIcon={<CheckSquare className="h-12 w-12 text-muted-foreground/50" />}
      />
    </div>
  );
}
