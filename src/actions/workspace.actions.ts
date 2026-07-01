'use server';

import { z } from 'zod';
import {
  makeCreateWorkspace,
  makeUpdateWorkspace,
  makeDeleteWorkspace,
  makeListWorkspaces,
  makeCheckPlanLimit,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import type { SerializedWorkspace } from '@/shared/types/workspace.types';
import { getSessionUser } from '@/lib/get-session-user';
import { env } from '@/config/env';

const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.string().min(1),
  icon: z.string().nullable().optional(),
});

const updateWorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100).optional(),
  color: z.string().min(1).optional(),
  icon: z.string().nullable().optional(),
});

function serializeWorkspace(ws: { id: string; name: string; slug: string; color: string; icon: string | null; createdAt: Date; updatedAt: Date }): SerializedWorkspace {
  return {
    id: ws.id,
    name: ws.name,
    slug: ws.slug,
    color: ws.color,
    icon: ws.icon,
    createdAt: serializeDate(ws.createdAt),
    updatedAt: serializeDate(ws.updatedAt),
  };
}

export async function createWorkspaceAction(
  input: z.infer<typeof createWorkspaceSchema>,
): Promise<ActionResult<SerializedWorkspace>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    if (env.BILLING_ENABLED) await makeCheckPlanLimit().execute({ userId, resource: 'workspace' });
    const data = createWorkspaceSchema.parse(input);
    const useCase = makeCreateWorkspace();
    const workspace = await useCase.execute({ ...data, userId });
    return serializeWorkspace(workspace);
  });
}

export async function updateWorkspaceAction(
  input: z.infer<typeof updateWorkspaceSchema>,
): Promise<ActionResult<SerializedWorkspace>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = updateWorkspaceSchema.parse(input);
    const useCase = makeUpdateWorkspace();
    const workspace = await useCase.execute({ ...data, userId });
    return serializeWorkspace(workspace);
  });
}

export async function deleteWorkspaceAction(id: string): Promise<ActionResult<void>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeDeleteWorkspace();
    await useCase.execute({ id, userId });
  });
}

export async function listWorkspacesAction(): Promise<ActionResult<SerializedWorkspace[]>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeListWorkspaces();
    const workspaces = await useCase.execute(userId);
    return workspaces.map(serializeWorkspace);
  });
}
