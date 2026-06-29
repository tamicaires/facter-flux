'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listMeetingsAction,
  listRecentMeetingsAction,
  getMeetingAction,
  getActiveMeetingAction,
  startMeetingAction,
  endMeetingAction,
} from '@/actions/meeting.actions';

export const meetingKeys = {
  all: ['meetings'] as const,
  active: () => [...meetingKeys.all, 'active'] as const,
  list: (workspaceId?: string) => [...meetingKeys.all, 'list', workspaceId] as const,
  recent: (limit?: number) => [...meetingKeys.all, 'recent', limit] as const,
  detail: (id: string) => [...meetingKeys.all, 'detail', id] as const,
};

export function useActiveMeeting() {
  return useQuery({
    queryKey: meetingKeys.active(),
    queryFn: async () => {
      const result = await getActiveMeetingAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 60_000,
  });
}

export function useMeetings(workspaceId?: string) {
  return useQuery({
    queryKey: meetingKeys.list(workspaceId),
    queryFn: async () => {
      const result = await listMeetingsAction(workspaceId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 30_000,
  });
}

export function useMeeting(id: string) {
  return useQuery({
    queryKey: meetingKeys.detail(id),
    queryFn: async () => {
      const result = await getMeetingAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useRecentMeetings(limit: number = 5) {
  return useQuery({
    queryKey: meetingKeys.recent(limit),
    queryFn: async () => {
      const result = await listRecentMeetingsAction(limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 30_000,
  });
}

export function useStartMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; workspaceId?: string | null }) => {
      const result = await startMeetingAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.all });
    },
  });
}

export function useEndMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await endMeetingAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingKeys.all });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}
