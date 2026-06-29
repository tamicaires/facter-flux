'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listWorkspacesAction, createWorkspaceAction, updateWorkspaceAction, deleteWorkspaceAction } from '@/actions/workspace.actions';
import type { SerializedWorkspace } from '@/shared/types/workspace.types';

export const workspaceKeys = {
  all: ['workspaces'] as const,
  list: () => [...workspaceKeys.all, 'list'] as const,
};

export function useWorkspaces() {
  return useQuery({
    queryKey: workspaceKeys.list(),
    queryFn: async () => {
      const result = await listWorkspacesAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: 60_000,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; color: string; icon?: string | null }) => {
      const result = await createWorkspaceAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; name?: string; color?: string; icon?: string | null }) => {
      const result = await updateWorkspaceAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteWorkspaceAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}
