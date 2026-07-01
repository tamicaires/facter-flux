'use client';

import { type ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './query-provider';
import { ToastProvider } from './toast-provider';
import { MeetingSessionProvider } from './meeting-session-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <QueryProvider>
        <MeetingSessionProvider>
          {children}
        </MeetingSessionProvider>
        <ToastProvider />
      </QueryProvider>
    </SessionProvider>
  );
}
