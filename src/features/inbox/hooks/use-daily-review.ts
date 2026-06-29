'use client';

import { useState, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@facter/ds-core';
import { updateEntryAction, pinEntryAction, archiveEntryAction } from '@/actions/entry.actions';
import { entryKeys } from '@/features/timeline/hooks/use-entries';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface ReviewStats {
  processed: number;
  pinned: number;
  discarded: number;
  skipped: number;
}

export function useDailyReview(entries: SerializedEntry[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<ReviewStats>({
    processed: 0,
    pinned: 0,
    discarded: 0,
    skipped: 0,
  });
  const queryClient = useQueryClient();

  const currentEntry = entries[currentIndex] ?? null;
  const isComplete = currentIndex >= entries.length;
  const total = entries.length;
  const progress = total > 0 ? Math.min(currentIndex / total, 1) : 0;

  const advance = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    queryClient.invalidateQueries({ queryKey: entryKeys.all });
  }, [queryClient]);

  const process = useCallback(async (data: {
    workspaceId?: string | null;
    tags?: string[];
    type?: SerializedEntry['type'];
  }) => {
    if (!currentEntry || isSubmitting) return;
    setIsSubmitting(true);

    const result = await updateEntryAction({
      id: currentEntry.id,
      status: 'ACTIVE',
      ...data,
    });

    setIsSubmitting(false);
    if (result.success) {
      setStats((prev) => ({ ...prev, processed: prev.processed + 1 }));
      toast.success('Entrada processada');
      advance();
    } else {
      toast.error(result.error);
    }
  }, [currentEntry, isSubmitting, advance]);

  const pin = useCallback(async () => {
    if (!currentEntry || isSubmitting) return;
    setIsSubmitting(true);

    const result = await pinEntryAction(currentEntry.id);

    setIsSubmitting(false);
    if (result.success) {
      setStats((prev) => ({ ...prev, pinned: prev.pinned + 1 }));
      toast.success('Entrada fixada');
      advance();
    } else {
      toast.error(result.error);
    }
  }, [currentEntry, isSubmitting, advance]);

  const discard = useCallback(async () => {
    if (!currentEntry || isSubmitting) return;
    setIsSubmitting(true);

    const result = await archiveEntryAction(currentEntry.id);

    setIsSubmitting(false);
    if (result.success) {
      setStats((prev) => ({ ...prev, discarded: prev.discarded + 1 }));
      toast.success('Entrada descartada');
      advance();
    } else {
      toast.error(result.error);
    }
  }, [currentEntry, isSubmitting, advance]);

  const skip = useCallback(() => {
    setStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
    advance();
  }, [advance]);

  return {
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
  };
}
