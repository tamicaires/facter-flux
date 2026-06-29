'use client';

import { useParams } from 'next/navigation';
import { FolderOpen } from 'lucide-react';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { TimelineView } from '@/features/timeline/components/timeline-view';

export default function WorkspacePage() {
  const params = useParams<{ slug: string }>();
  const { data: workspaces } = useWorkspaces();
  const workspace = workspaces?.find((w) => w.slug === params.slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {workspace && (
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: workspace.color }}
          />
        )}
        <h1 className="text-2xl font-semibold">
          {workspace?.name ?? params.slug}
        </h1>
      </div>
      <TimelineView
        workspaceId={workspace?.id}
        emptyMessage="Nenhuma entrada neste workspace"
        emptyIcon={<FolderOpen className="h-12 w-12 text-muted-foreground/50" />}
      />
    </div>
  );
}
