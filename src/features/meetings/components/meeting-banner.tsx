'use client';

import { Radio, Square } from 'lucide-react';
import { Button } from '@facter/ds-core';
import { useMeetingSession } from '../hooks/use-meeting-session';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function MeetingBanner() {
  const { session, isActive, end } = useMeetingSession();

  if (!isActive || !session) return null;

  return (
    <div className="sticky top-16 z-30 -mx-4 -mt-4 mb-4 lg:-mx-6 lg:-mt-6 flex items-center justify-between bg-red-600 text-white px-4 py-2.5 shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <Radio className="h-4 w-4 text-white" />
          <span className="absolute h-4 w-4 rounded-full bg-white/30 animate-ping" />
        </div>
        <span className="text-sm font-semibold">
          {session.meeting.name}
        </span>
        <span className="rounded bg-red-700/60 px-2 py-0.5 font-mono text-xs tabular-nums">
          {formatElapsed(session.elapsed)}
        </span>
        {session.meeting.workspace && (
          <div className="hidden sm:flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-full ring-1 ring-white/30"
              style={{ backgroundColor: session.meeting.workspace.color }}
            />
            <span className="text-xs text-red-100">
              {session.meeting.workspace.name}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-xs text-red-100">
          Ctrl+M captura · Ctrl+Shift+M encerra
        </span>
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5 bg-white/15 text-white hover:bg-white/25 border-0"
          onClick={end}
        >
          <Square className="h-3 w-3" />
          Encerrar
        </Button>
      </div>
    </div>
  );
}
