'use client';

import { PartyPopper, Check, Pin, Trash2, SkipForward } from 'lucide-react';
import { Button, Card, CardContent } from '@facter/ds-core';
import Link from 'next/link';

interface ReviewCompleteProps {
  stats: {
    processed: number;
    pinned: number;
    discarded: number;
    skipped: number;
  };
}

export function ReviewComplete({ stats }: ReviewCompleteProps) {
  const total = stats.processed + stats.pinned + stats.discarded + stats.skipped;

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <PartyPopper className="h-16 w-16 text-primary" />
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Inbox processado!</h2>
        <p className="text-muted-foreground">
          {total} {total === 1 ? 'entrada revisada' : 'entradas revisadas'}
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardContent className="p-4 space-y-2">
          {stats.processed > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>{stats.processed} processadas</span>
            </div>
          )}
          {stats.pinned > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Pin className="h-4 w-4 text-blue-500" />
              <span>{stats.pinned} fixadas</span>
            </div>
          )}
          {stats.discarded > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Trash2 className="h-4 w-4 text-red-500" />
              <span>{stats.discarded} descartadas</span>
            </div>
          )}
          {stats.skipped > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <SkipForward className="h-4 w-4 text-muted-foreground" />
              <span>{stats.skipped} puladas</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Link href="/inbox">
        <Button variant="outline">Voltar ao Inbox</Button>
      </Link>
    </div>
  );
}
