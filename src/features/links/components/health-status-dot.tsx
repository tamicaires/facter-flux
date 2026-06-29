'use client';

import type { HealthResult } from '../hooks/use-health-check';

interface HealthStatusDotProps {
  result?: HealthResult;
}

function getColor(result?: HealthResult): string {
  if (!result) return '#9ca3af'; // gray - not checked
  if (!result.ok) return '#ef4444'; // red - error
  if (result.responseTime > 3000 || result.redirected) return '#eab308'; // yellow - slow/redirect
  return '#22c55e'; // green - ok
}

function getTitle(result?: HealthResult): string {
  if (!result) return 'Nao verificado';
  if (!result.ok) return `Erro: ${result.error ?? `Status ${result.status}`}`;
  if (result.responseTime > 3000) return `Lento: ${result.responseTime}ms`;
  if (result.redirected) return `Redirect: ${result.responseTime}ms`;
  return `OK: ${result.responseTime}ms`;
}

export function HealthStatusDot({ result }: HealthStatusDotProps) {
  const color = getColor(result);
  const title = getTitle(result);

  return (
    <div
      className="h-2.5 w-2.5 rounded-full shrink-0 transition-colors"
      style={{ backgroundColor: color }}
      title={title}
    />
  );
}
