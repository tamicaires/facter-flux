'use client';

import { ExternalLink, Trash2 } from 'lucide-react';
import { useDeleteEnvironmentLink } from '../hooks/use-environment-links';
import { HealthStatusDot } from './health-status-dot';
import { ENVIRONMENT_COLORS } from '@/shared/constants/environment-patterns';
import type { HealthResult } from '../hooks/use-health-check';

interface LinkCardProps {
  id: string;
  url: string;
  environment: string;
  healthResult?: HealthResult;
}

export function LinkCard({ id, url, environment, healthResult }: LinkCardProps) {
  const deleteMutation = useDeleteEnvironmentLink();

  return (
    <div className="group flex items-center gap-2 rounded-md border border-border p-2 hover:bg-accent/50 transition-colors">
      <HealthStatusDot result={healthResult} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-primary hover:underline truncate flex-1"
      >
        Abrir
        <ExternalLink className="h-3 w-3" />
      </a>
      <button
        onClick={() => deleteMutation.mutate(id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}
