'use server';

import { z } from 'zod';
import { makeSearchEntries } from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import type { SerializedEntry } from '@/shared/types/entry.types';
import type { PaginatedResult } from '@/shared/types/common.types';
import { prisma } from '@/infra/database/prisma';
import { serializeDate } from '@/shared/utils/serialize.utils';

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
    const data = searchSchema.parse(input);
    const useCase = makeSearchEntries();
    const result = await useCase.execute({
      query: data.query,
      filters: {
        workspaceId: data.workspaceId,
        type: data.type,
      },
      pagination: { page: data.page, perPage: data.perPage },
    });

    const ids = result.data.map((e) => e.id);
    const rows = await prisma.entry.findMany({
      where: { id: { in: ids } },
      include: {
        tags: { include: { tag: true } },
        workspace: true,
      },
    });

    const rowMap = new Map(rows.map((r) => [r.id, r]));
    const serialized: SerializedEntry[] = ids
      .map((id) => rowMap.get(id))
      .filter((raw) => raw != null)
      .map((raw) => ({
        id: raw.id,
        content: raw.content,
        type: raw.type,
        status: raw.status,
        workspaceId: raw.workspaceId,
        assignee: raw.assignee,
        pinned: raw.pinned,
        metadata: raw.metadata as SerializedEntry['metadata'],
        source: raw.source,
        meetingId: raw.meetingId,
        createdAt: serializeDate(raw.createdAt),
        updatedAt: serializeDate(raw.updatedAt),
        tags: raw.tags.map((et) => ({
          id: et.tag.id,
          name: et.tag.name,
          color: et.tag.color,
        })),
        workspace: raw.workspace
          ? {
              id: raw.workspace.id,
              name: raw.workspace.name,
              slug: raw.workspace.slug,
              color: raw.workspace.color,
            }
          : null,
      }));

    return { ...result, data: serialized };
  });
}
