'use server';

import { z } from 'zod';
import { makeCreateTag, makeListTags } from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';

const createTagSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().nullable().optional(),
  workspaceId: z.string().uuid().nullable().optional(),
});

interface SerializedTag {
  id: string;
  name: string;
  color: string | null;
  workspaceId: string | null;
  createdAt: string;
}

function serializeTag(tag: { id: string; name: string; color: string | null; workspaceId: string | null; createdAt: Date }): SerializedTag {
  return {
    id: tag.id,
    name: tag.name,
    color: tag.color,
    workspaceId: tag.workspaceId,
    createdAt: serializeDate(tag.createdAt),
  };
}

export async function createTagAction(
  input: z.infer<typeof createTagSchema>,
): Promise<ActionResult<SerializedTag>> {
  return handleAction(async () => {
    const data = createTagSchema.parse(input);
    const useCase = makeCreateTag();
    const tag = await useCase.execute(data);
    return serializeTag(tag);
  });
}

export async function listTagsAction(
  workspaceId?: string,
): Promise<ActionResult<SerializedTag[]>> {
  return handleAction(async () => {
    const useCase = makeListTags();
    const tags = await useCase.execute(workspaceId);
    return tags.map(serializeTag);
  });
}
