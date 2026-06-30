'use client';

import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from '@facter/ds-core';
import { useQueryClient } from '@tanstack/react-query';
import {
  MeetingSessionContext,
  useMeetingSessionState,
} from '@/features/meetings/hooks/use-meeting-session';
import { useActiveMeeting, useEndMeeting, meetingKeys } from '@/features/meetings/hooks/use-meetings';
import { MeetingSummaryDialog } from '@/features/meetings/components/meeting-summary-dialog';
import { StartMeetingDialog } from '@/features/meetings/components/start-meeting-dialog';
import type { MeetingSummary, SerializedMeeting } from '@/shared/types/meeting.types';

interface MeetingSessionProviderProps {
  children: ReactNode;
}

export function MeetingSessionProvider({ children }: MeetingSessionProviderProps) {
  const state = useMeetingSessionState();
  const endMutation = useEndMeeting();
  const queryClient = useQueryClient();
  const { data: activeMeeting } = useActiveMeeting();
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    meeting: SerializedMeeting;
    summary: MeetingSummary;
  } | null>(null);

  // Hydrate session from backend if there's an active meeting we don't know about
  useEffect(() => {
    if (activeMeeting && !state.isActive) {
      state.start(activeMeeting);
    }
  }, [activeMeeting, state.isActive, state.start]);

  const handleEnd = useCallback(async () => {
    if (!state.meetingId) return;
    const result = await endMutation.mutateAsync(state.meetingId);
    // Clear cached active meeting BEFORE stopping the session
    // to prevent the hydration effect from re-starting it
    queryClient.setQueryData(meetingKeys.active(), null);
    state.stop();
    setSummaryData(result);
  }, [state.meetingId, endMutation, state.stop, queryClient]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'm') {
        e.preventDefault();
        if (!state.isActive) {
          setShowStartDialog(true);
        }
        // When meeting is active, Ctrl+M opens the capture bar
        // (handled by use-capture.ts)
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        if (state.isActive) {
          handleEnd();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isActive, handleEnd]);

  const contextValue = useMemo(
    () => ({ ...state, end: handleEnd }),
    [state, handleEnd],
  );

  return (
    <MeetingSessionContext.Provider value={contextValue}>
      {children}

      <StartMeetingDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        activeMeeting={state.isActive && state.session ? state.session.meeting : null}
        onStarted={(meeting) => {
          state.start(meeting);
          setShowStartDialog(false);
          toast.success(`Reuniao "${meeting.name}" iniciada`);
        }}
      />

      <MeetingSummaryDialog
        data={summaryData}
        onClose={() => setSummaryData(null)}
      />
    </MeetingSessionContext.Provider>
  );
}
