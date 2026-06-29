'use client';

import { ArrowLeft, Inbox } from 'lucide-react';
import { Skeleton } from '@facter/ds-core';
import { useEntries } from '@/features/timeline/hooks/use-entries';
import { DailyReviewFlow } from '@/features/inbox/components/daily-review-flow';
import Link from 'next/link';

export default function InboxReviewPage() {
  const { data, isLoading } = useEntries({ status: 'INBOX', perPage: 100 });
  const entries = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/inbox"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Inbox
        </Link>
        <div className="flex items-center gap-3">
          <Inbox className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">Processar Inbox</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <h3 className="text-lg font-medium text-muted-foreground">Inbox vazio</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Nenhuma entrada para processar
          </p>
        </div>
      ) : (
        <DailyReviewFlow entries={entries} />
      )}
    </div>
  );
}
