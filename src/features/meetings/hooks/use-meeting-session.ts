'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { SerializedMeeting } from '@/shared/types/meeting.types';

const STORAGE_KEY = 'facter:active-meeting';

interface MeetingSession {
  meeting: SerializedMeeting;
  elapsed: number;
}

interface MeetingSessionContextValue {
  session: MeetingSession | null;
  isActive: boolean;
  start: (meeting: SerializedMeeting) => void;
  stop: () => void;
  end: () => Promise<void>;
  meetingId: string | null;
}

export const MeetingSessionContext = createContext<MeetingSessionContextValue>({
  session: null,
  isActive: false,
  start: () => {},
  stop: () => {},
  end: async () => {},
  meetingId: null,
});

export function useMeetingSession() {
  return useContext(MeetingSessionContext);
}

function loadPersistedMeeting(): SerializedMeeting | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SerializedMeeting;
  } catch {
    return null;
  }
}

function persistMeeting(meeting: SerializedMeeting | null) {
  if (typeof window === 'undefined') return;
  if (meeting) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(meeting));
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

export function useMeetingSessionState() {
  const [session, setSession] = useState<MeetingSession | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const hydratedRef = useRef(false);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const persisted = loadPersistedMeeting();
    if (persisted && !persisted.endedAt) {
      const elapsed = Date.now() - new Date(persisted.startedAt).getTime();
      setSession({ meeting: persisted, elapsed });
    }
  }, []);

  const start = useCallback((meeting: SerializedMeeting) => {
    persistMeeting(meeting);
    setSession({ meeting, elapsed: 0 });
  }, []);

  const stop = useCallback(() => {
    persistMeeting(null);
    setSession(null);
  }, []);

  useEffect(() => {
    if (session) {
      intervalRef.current = setInterval(() => {
        setSession((prev) => {
          if (!prev) return null;
          const startTime = new Date(prev.meeting.startedAt).getTime();
          return { ...prev, elapsed: Date.now() - startTime };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [session !== null]);

  return {
    session,
    isActive: session !== null,
    start,
    stop,
    meetingId: session?.meeting.id ?? null,
  };
}
