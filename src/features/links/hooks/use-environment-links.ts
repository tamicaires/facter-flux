'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@facter/ds-core';
import {
  listEnvironmentLinksAction,
  createEnvironmentLinkAction,
  deleteEnvironmentLinkAction,
} from '@/actions/environment-link.actions';

export const envLinkKeys = {
  all: ['environment-links'] as const,
  list: (workspaceId?: string) => [...envLinkKeys.all, 'list', workspaceId] as const,
};

export function useEnvironmentLinks(workspaceId?: string) {
  return useQuery({
    queryKey: envLinkKeys.list(workspaceId),
    queryFn: async () => {
      const result = await listEnvironmentLinksAction(workspaceId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useCreateEnvironmentLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      serviceName: string;
      environment: string;
      url: string;
    }) => {
      const result = await createEnvironmentLinkAction(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Link adicionado');
      queryClient.invalidateQueries({ queryKey: envLinkKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteEnvironmentLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteEnvironmentLinkAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      toast.success('Link removido');
      queryClient.invalidateQueries({ queryKey: envLinkKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
