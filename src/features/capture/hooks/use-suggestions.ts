'use client';

import { useState, useEffect, useRef } from 'react';
import { suggestMetadataAction } from '@/actions/suggestion.actions';
import type { SuggestionResult } from '@/shared/types/entry.types';

const DEBOUNCE_MS = 300;

export function useSuggestions(text: string) {
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!text.trim() || text.length < 3) {
      setSuggestion(null);
      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const result = await suggestMetadataAction(text);
        setSuggestion(result);
      } catch {
        setSuggestion(null);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text]);

  const clearSuggestion = () => setSuggestion(null);

  return { suggestion, isLoading, clearSuggestion };
}
