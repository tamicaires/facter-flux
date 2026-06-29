'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
} from '@facter/ds-core';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { useStartMeeting } from '../hooks/use-meetings';
import type { SerializedMeeting } from '@/shared/types/meeting.types';

interface StartMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStarted: (meeting: SerializedMeeting) => void;
  activeMeeting?: SerializedMeeting | null;
}

export function StartMeetingDialog({ open, onOpenChange, onStarted, activeMeeting }: StartMeetingDialogProps) {
  const [name, setName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const { data: workspaces } = useWorkspaces();
  const startMutation = useStartMeeting();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const meeting = await startMutation.mutateAsync({
      name: name.trim(),
      workspaceId: workspaceId || null,
    });

    setName('');
    setWorkspaceId('');
    onStarted(meeting);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar Reuniao</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeMeeting && (
            <div className="flex items-start gap-3 rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  Reuniao em andamento
                </p>
                <p className="text-muted-foreground mt-0.5">
                  &ldquo;{activeMeeting.name}&rdquo; sera encerrada automaticamente ao iniciar uma nova.
                </p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome da Reuniao</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Daily Martech, Sprint Planning..."
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace (opcional)</label>
            <select
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Nenhum</option>
              {workspaces?.map((ws) => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || startMutation.isPending}
            >
              {activeMeeting ? 'Encerrar anterior e iniciar' : 'Iniciar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
