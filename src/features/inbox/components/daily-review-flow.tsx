'use client';

import { useDailyReview } from '../hooks/use-daily-review';
import { ReviewEntryCard } from './review-entry-card';
import { ReviewComplete } from './review-complete';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface DailyReviewFlowProps {
  entries: SerializedEntry[];
}

export function DailyReviewFlow({ entries }: DailyReviewFlowProps) {
  const {
    currentEntry,
    currentIndex,
    total,
    progress,
    isComplete,
    isSubmitting,
    stats,
    process,
    pin,
    discard,
    skip,
  } = useDailyReview(entries);

  if (isComplete) {
    return <ReviewComplete stats={stats} />;
  }

  if (!currentEntry) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{currentIndex + 1} de {total}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <ReviewEntryCard
        key={currentEntry.id}
        entry={currentEntry}
        isSubmitting={isSubmitting}
        onProcess={process}
        onPin={pin}
        onDiscard={discard}
        onSkip={skip}
      />
    </div>
  );
}
