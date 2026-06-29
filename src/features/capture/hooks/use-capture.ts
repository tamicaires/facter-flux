'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from '@facter/ds-core';
import { createEntryAction } from '@/actions/entry.actions';
import { useSuggestions } from './use-suggestions';
import { useQueryClient } from '@tanstack/react-query';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { useMeetingSession } from '@/features/meetings/hooks/use-meeting-session';
import type { EntryType, EntryMetadata } from '@/shared/types/entry.types';

export function useCapture() {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { suggestion, isLoading: isSuggesting } = useSuggestions(text);
  const queryClient = useQueryClient();
  const { data: workspaces } = useWorkspaces();
  const { isActive: isMeetingActive, meetingId, session: meetingSession } = useMeetingSession();

  const [overrides, setOverrides] = useState<{
    type?: EntryType;
    workspaceId?: string | null;
    tags?: string[];
    assignee?: string | null;
  }>({});

  const suggestedWorkspaceId = useMemo(() => {
    if (!suggestion?.workspace || !workspaces) return null;
    const ws = workspaces.find((w) => w.slug === suggestion.workspace);
    return ws?.id ?? null;
  }, [suggestion?.workspace, workspaces]);

  const effectiveType = overrides.type ?? suggestion?.type ?? 'NOTE';
  const effectiveTags = overrides.tags ?? suggestion?.tags ?? [];
  const effectiveAssignee = overrides.assignee ?? suggestion?.assignee ?? null;
  const meetingWorkspaceId = isMeetingActive ? meetingSession?.meeting.workspaceId ?? null : null;
  const effectiveWorkspaceId = overrides.workspaceId ?? suggestedWorkspaceId ?? meetingWorkspaceId;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setText('');
    setOverrides({});
  }, []);

  const submit = useCallback(async () => {
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createEntryAction({
        content: text,
        type: effectiveType,
        workspaceId: effectiveWorkspaceId,
        assignee: effectiveAssignee,
        tags: effectiveTags,
        metadata: (suggestion?.metadata as Record<string, unknown>) ?? null,
        source: isMeetingActive ? 'MEETING' : 'QUICK_CAPTURE',
        ...(isMeetingActive && meetingId ? { meetingId } : {}),
      });

      if (result.success) {
        toast.success('Entrada capturada');
        close();
        queryClient.invalidateQueries({ queryKey: ['entries'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('Erro ao capturar entrada');
    } finally {
      setIsSubmitting(false);
    }
  }, [text, effectiveType, effectiveWorkspaceId, effectiveAssignee, effectiveTags, suggestion, isSubmitting, close, queryClient]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }

      // Ctrl+M during active meeting opens the capture bar
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'm' && isMeetingActive) {
        e.preventDefault();
        if (!isOpen) {
          open();
        }
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, open, close, isMeetingActive]);

  const addTag = useCallback((tag: string) => {
    const currentTags = overrides.tags ?? suggestion?.tags ?? [];
    if (!currentTags.includes(tag)) {
      setOverrides((prev) => ({ ...prev, tags: [...(prev.tags ?? suggestion?.tags ?? []), tag] }));
    }
  }, [overrides.tags, suggestion?.tags]);

  return {
    text,
    setText,
    isOpen,
    open,
    close,
    submit,
    isSubmitting,
    isSuggesting,
    suggestion,
    effectiveType,
    effectiveTags,
    effectiveAssignee,
    effectiveWorkspaceId,
    setOverrides,
    overrides,
    addTag,
  };
}
