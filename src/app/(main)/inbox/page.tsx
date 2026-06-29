'use client';

import { Inbox, PlayCircle } from 'lucide-react';
import { Button } from '@facter/ds-core';
import { TimelineView } from '@/features/timeline/components/timeline-view';
import { useEntries } from '@/features/timeline/hooks/use-entries';
import Link from 'next/link';

export default function InboxPage() {
  const { data } = useEntries({ status: 'INBOX' });
  const inboxCount = data?.total ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Inbox className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">Inbox</h1>
        </div>
        {inboxCount > 0 && (
          <Link href="/inbox/review">
            <Button variant="outline" size="sm" className="gap-1.5">
              <PlayCircle className="h-4 w-4" />
              Processar Inbox ({inboxCount})
            </Button>
          </Link>
        )}
      </div>
      <TimelineView
        status="INBOX"
        emptyMessage="Inbox vazio"
        emptyIcon={<Inbox className="h-12 w-12 text-muted-foreground/50" />}
      />
    </div>
  );
}
