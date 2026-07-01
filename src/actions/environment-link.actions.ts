'use server';

import { z } from 'zod';
import {
  makeCreateEnvironmentLink,
  makeListEnvironmentLinks,
  makeDeleteEnvironmentLink,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import { getSessionUser } from '@/lib/get-session-user';

const createLinkSchema = z.object({
  workspaceId: z.string().uuid(),
  serviceName: z.string().min(1),
  environment: z.string().min(1),
  url: z.string().url(),
  order: z.number().int().optional(),
});

interface SerializedEnvironmentLink {
  id: string;
  workspaceId: string;
  serviceName: string;
  environment: string;
  url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

function serializeLink(link: {
  id: string;
  workspaceId: string;
  serviceName: string;
  environment: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}): SerializedEnvironmentLink {
  return {
    id: link.id,
    workspaceId: link.workspaceId,
    serviceName: link.serviceName,
    environment: link.environment,
    url: link.url,
    order: link.order,
    createdAt: serializeDate(link.createdAt),
    updatedAt: serializeDate(link.updatedAt),
  };
}

export async function createEnvironmentLinkAction(
  input: z.infer<typeof createLinkSchema>,
): Promise<ActionResult<SerializedEnvironmentLink>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = createLinkSchema.parse(input);
    const useCase = makeCreateEnvironmentLink();
    const link = await useCase.execute({ ...data, userId });
    return serializeLink(link);
  });
}

export async function listEnvironmentLinksAction(
  workspaceId?: string,
): Promise<ActionResult<SerializedEnvironmentLink[]>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeListEnvironmentLinks();
    const links = await useCase.execute({ userId, workspaceId });
    return links.map(serializeLink);
  });
}

export async function deleteEnvironmentLinkAction(id: string): Promise<ActionResult<void>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeDeleteEnvironmentLink();
    await useCase.execute({ id, userId });
  });
}
