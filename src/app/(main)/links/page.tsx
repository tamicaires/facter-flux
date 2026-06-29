'use client';

import { Link2 } from 'lucide-react';
import { EnvironmentDashboard } from '@/features/links/components/environment-dashboard';

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link2 className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Links por Ambiente</h1>
      </div>
      <EnvironmentDashboard />
    </div>
  );
}
