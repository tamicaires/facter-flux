'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Button,
  Input,
} from '@facter/ds-core';
import { useCreateEnvironmentLink } from '../hooks/use-environment-links';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';

const ENVIRONMENTS = ['prod', 'uat', 'staging', 'dev'];

export function AddLinkDialog() {
  const [open, setOpen] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [environment, setEnvironment] = useState('prod');
  const [url, setUrl] = useState('');
  const { data: workspaces } = useWorkspaces();
  const createMutation = useCreateEnvironmentLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId || !serviceName || !url) return;

    await createMutation.mutateAsync({
      workspaceId,
      serviceName,
      environment,
      url,
    });
    setServiceName('');
    setUrl('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Adicionar Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Link de Ambiente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace</label>
            <select
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              {workspaces?.map((ws) => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Servico</label>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Ex: ArgoCD, API Gateway, Dashboard"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ambiente</label>
            <div className="flex gap-2">
              {ENVIRONMENTS.map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => setEnvironment(env)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    environment === env
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {env.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              type="url"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!workspaceId || !serviceName || !url || createMutation.isPending}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
