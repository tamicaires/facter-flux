'use server';

import { z } from 'zod';
import { makeSearchEntries } from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import type { SerializedEntry } from '@/shared/types/entry.types';
import type { PaginatedResult } from '@/shared/types/common.types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import { getSessionUser } from '@/lib/get-session-user';

const searchSchema = z.object({
  query: z.string().min(1),
  workspaceId: z.string().uuid().optional(),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).optional(),
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
});

export async function searchEntriesAction(
  input: z.infer<typeof searchSchema>,
): Promise<ActionResult<PaginatedResult<SerializedEntry>>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = searchSchema.parse(input);
    const useCase = makeSearchEntries();
    const result = await useCase.execute({
      query: data.query,
      filters: {
        userId,
        workspaceId: data.workspaceId,
        type: data.type,
      },
      pagination: { page: data.page, perPage: data.perPage },
    });

    const serialized: SerializedEntry[] = result.data.map((entry) => ({
      id: entry.id,
      content: entry.content,
      type: entry.type,
      status: entry.status,
      workspaceId: entry.workspaceId,
      assignee: entry.assignee,
      pinned: entry.pinned,
      metadata: entry.metadata as SerializedEntry['metadata'],
      source: entry.source,
      meetingId: entry.meetingId,
      createdAt: serializeDate(entry.createdAt),
      updatedAt: serializeDate(entry.updatedAt),
      tags: [],
      workspace: null,
    }));

    return { ...result, data: serialized };
  });
}
