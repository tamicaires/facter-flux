'use client';

import { useMemo } from 'react';
import { Loader2, Link2, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@facter/ds-core';
import { useEnvironmentLinks } from '../hooks/use-environment-links';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { useHealthCheck } from '../hooks/use-health-check';
import { LinkCard } from './link-card';
import { AddLinkDialog } from './add-link-dialog';

const ENV_ORDER = ['prod', 'uat', 'staging', 'dev'];

export function EnvironmentDashboard() {
  const { data: links, isLoading: linksLoading } = useEnvironmentLinks();
  const { data: workspaces, isLoading: wsLoading } = useWorkspaces();
  const { checkAll, getResult, status: healthStatus } = useHealthCheck();

  const allUrls = useMemo(() => {
    return links?.map((l) => l.url) ?? [];
  }, [links]);

  const grouped = useMemo(() => {
    if (!links || !workspaces) return new Map();

    const groups = new Map<string, {
      workspace: { id: string; name: string; color: string };
      services: Map<string, Map<string, { id: string; url: string }>>;
    }>();

    for (const link of links) {
      const ws = workspaces.find((w) => w.id === link.workspaceId);
      if (!ws) continue;

      if (!groups.has(ws.id)) {
        groups.set(ws.id, {
          workspace: { id: ws.id, name: ws.name, color: ws.color },
          services: new Map(),
        });
      }

      const group = groups.get(ws.id)!;
      if (!group.services.has(link.serviceName)) {
        group.services.set(link.serviceName, new Map());
      }
      group.services.get(link.serviceName)!.set(link.environment, {
        id: link.id,
        url: link.url,
      });
    }

    return groups;
  }, [links, workspaces]);

  if (linksLoading || wsLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (grouped.size === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AddLinkDialog />
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Link2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">Nenhum link registrado</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Adicione links de ambiente para seus servicos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AddLinkDialog />
        {allUrls.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => checkAll(allUrls)}
            disabled={healthStatus === 'checking'}
          >
            <Activity className="h-4 w-4" />
            {healthStatus === 'checking' ? 'Verificando...' : 'Check All'}
          </Button>
        )}
      </div>

      {[...grouped.values()].map(({ workspace, services }) => {
        const serviceNames = [...services.keys()].sort();

        return (
          <Card key={workspace.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: workspace.color }}
                />
                {workspace.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 pr-4 text-left text-xs font-medium text-muted-foreground w-20">
                        Env
                      </th>
                      {serviceNames.map((name) => (
                        <th key={name} className="pb-2 px-2 text-left text-xs font-medium text-muted-foreground">
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ENV_ORDER.map((env) => {
                      const hasAny = serviceNames.some((s) => services.get(s)?.has(env));
                      if (!hasAny) return null;

                      return (
                        <tr key={env} className="border-b border-border/50 last:border-0">
                          <td className="py-2 pr-4 text-xs font-medium uppercase text-muted-foreground">
                            {env}
                          </td>
                          {serviceNames.map((name) => {
                            const link = services.get(name)?.get(env);
                            return (
                              <td key={name} className="py-2 px-2">
                                {link ? (
                                  <LinkCard id={link.id} url={link.url} environment={env} healthResult={getResult(link.url)} />
                                ) : (
                                  <span className="text-xs text-muted-foreground/50">---</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
