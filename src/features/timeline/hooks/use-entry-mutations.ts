'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@facter/ds-core';
import {
  pinEntryAction,
  archiveEntryAction,
  deleteEntryAction,
  updateEntryAction,
} from '@/actions/entry.actions';
import { entryKeys } from './use-entries';

export function usePinEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await pinEntryAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      toast.success(data.pinned ? 'Entrada fixada' : 'Entrada desfixada');
      queryClient.invalidateQueries({ queryKey: entryKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useArchiveEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await archiveEntryAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Entrada arquivada');
      queryClient.invalidateQueries({ queryKey: entryKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteEntryAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      toast.success('Entrada removida');
      queryClient.invalidateQueries({ queryKey: entryKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useMarkDone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await updateEntryAction({ id, status: 'DONE' });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success('Task concluida');
      queryClient.invalidateQueries({ queryKey: entryKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
