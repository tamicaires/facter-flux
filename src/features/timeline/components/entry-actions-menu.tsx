'use client';

import { MoreHorizontal, Pin, PinOff, Archive, Trash2, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@facter/ds-core';
import { usePinEntry, useArchiveEntry, useDeleteEntry, useMarkDone } from '../hooks/use-entry-mutations';
import type { SerializedEntry } from '@/shared/types/entry.types';

interface EntryActionsMenuProps {
  entry: SerializedEntry;
}

export function EntryActionsMenu({ entry }: EntryActionsMenuProps) {
  const pinMutation = usePinEntry();
  const archiveMutation = useArchiveEntry();
  const deleteMutation = useDeleteEntry();
  const markDoneMutation = useMarkDone();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => pinMutation.mutate(entry.id)}>
          {entry.pinned ? (
            <>
              <PinOff className="mr-2 h-4 w-4" />
              Desfixar
            </>
          ) : (
            <>
              <Pin className="mr-2 h-4 w-4" />
              Fixar
            </>
          )}
        </DropdownMenuItem>
        {entry.type === 'TASK' && entry.status !== 'DONE' && (
          <DropdownMenuItem onClick={() => markDoneMutation.mutate(entry.id)}>
            <Check className="mr-2 h-4 w-4" />
            Marcar concluida
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => archiveMutation.mutate(entry.id)}>
          <Archive className="mr-2 h-4 w-4" />
          Arquivar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteMutation.mutate(entry.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
