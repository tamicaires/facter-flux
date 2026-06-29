'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Badge,
} from '@facter/ds-core';
import { CheckCircle2 } from 'lucide-react';
import type { MeetingSummary, SerializedMeeting } from '@/shared/types/meeting.types';

interface MeetingSummaryDialogProps {
  data: { meeting: SerializedMeeting; summary: MeetingSummary } | null;
  onClose: () => void;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}min`;
  }
  return `${minutes}min`;
}

const TYPE_LABELS: Record<string, string> = {
  NOTE: 'notes',
  TASK: 'tasks',
  LINK: 'links',
  SNIPPET: 'snippets',
};

export function MeetingSummaryDialog({ data, onClose }: MeetingSummaryDialogProps) {
  if (!data) return null;

  const { meeting, summary } = data;

  return (
    <Dialog open={!!data} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Reuniao Encerrada
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{meeting.name}</h3>
            <p className="text-sm text-muted-foreground">
              Duracao: {formatDuration(summary.duration)}
            </p>
          </div>

          <div className="rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm font-medium">
              {summary.totalEntries} {summary.totalEntries === 1 ? 'entrada' : 'entradas'} capturadas
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(summary.byType).map(([type, count]) => (
                <Badge key={type} variant="secondary">
                  {count} {TYPE_LABELS[type] ?? type.toLowerCase()}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
