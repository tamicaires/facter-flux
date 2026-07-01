'use server';

import { z } from 'zod';
import {
  makeCreateEntry,
  makeListEntries,
  makeUpdateEntry,
  makeDeleteEntry,
  makePinEntry,
  makeArchiveEntry,
  makeGetDashboardStats,
  makeCheckPlanLimit,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import type { SerializedEntry } from '@/shared/types/entry.types';
import type { PaginatedResult } from '@/shared/types/common.types';
import type { DashboardStats } from '@/core/domain/repositories/entries.repository';
import { getSessionUser } from '@/lib/get-session-user';
import { env } from '@/config/env';

const createEntrySchema = z.object({
  content: z.string().min(1),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).optional(),
  workspaceId: z.string().uuid().nullable().optional(),
  assignee: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  source: z.enum(['MANUAL', 'QUICK_CAPTURE', 'MEETING', 'IMPORT']).optional(),
  meetingId: z.string().uuid().nullable().optional(),
  tags: z.array(z.string()).optional(),
});

const updateEntrySchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).optional(),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).optional(),
  status: z.enum(['INBOX', 'ACTIVE', 'DONE', 'ARCHIVED']).optional(),
  workspaceId: z.string().uuid().nullable().optional(),
  assignee: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  tags: z.array(z.string()).optional(),
});

const listEntriesSchema = z.object({
  workspaceId: z.string().uuid().optional(),
  status: z.enum(['INBOX', 'ACTIVE', 'DONE', 'ARCHIVED']).optional(),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).optional(),
  pinned: z.boolean().optional(),
  meetingId: z.string().uuid().optional(),
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(50),
});

function serializeEntry(entry: {
  id: string;
  content: string;
  type: string;
  status: string;
  workspaceId: string | null;
  assignee: string | null;
  pinned: boolean;
  metadata: unknown;
  source: string;
  meetingId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): SerializedEntry {
  return {
    id: entry.id,
    content: entry.content,
    type: entry.type as SerializedEntry['type'],
    status: entry.status as SerializedEntry['status'],
    workspaceId: entry.workspaceId,
    assignee: entry.assignee,
    pinned: entry.pinned,
    metadata: entry.metadata as SerializedEntry['metadata'],
    source: entry.source as SerializedEntry['source'],
    meetingId: entry.meetingId,
    createdAt: serializeDate(entry.createdAt),
    updatedAt: serializeDate(entry.updatedAt),
    tags: [],
    workspace: null,
  };
}

export async function createEntryAction(
  input: z.infer<typeof createEntrySchema>,
): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    if (env.BILLING_ENABLED) await makeCheckPlanLimit().execute({ userId, resource: 'entry' });
    const data = createEntrySchema.parse(input);
    const useCase = makeCreateEntry();
    const entry = await useCase.execute({ ...data, userId });
    return serializeEntry(entry);
  });
}

export async function listEntriesAction(
  input: z.infer<typeof listEntriesSchema>,
): Promise<ActionResult<PaginatedResult<SerializedEntry>>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = listEntriesSchema.parse(input);
    const useCase = makeListEntries();
    const result = await useCase.execute({
      filters: {
        userId,
        workspaceId: data.workspaceId,
        status: data.status,
        type: data.type,
        pinned: data.pinned,
        meetingId: data.meetingId,
      },
      pagination: { page: data.page, perPage: data.perPage },
    });

    return {
      data: result.data.map(serializeEntry),
      total: result.total,
      page: result.page,
      perPage: result.perPage,
      totalPages: result.totalPages,
    };
  });
}

export async function updateEntryAction(
  input: z.infer<typeof updateEntrySchema>,
): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const data = updateEntrySchema.parse(input);
    const useCase = makeUpdateEntry();
    const entry = await useCase.execute({ ...data, userId });
    return serializeEntry(entry);
  });
}

export async function deleteEntryAction(id: string): Promise<ActionResult<void>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeDeleteEntry();
    await useCase.execute({ id, userId });
  });
}

export async function pinEntryAction(id: string): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makePinEntry();
    const entry = await useCase.execute({ id, userId });
    return serializeEntry(entry);
  });
}

export async function archiveEntryAction(id: string): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeArchiveEntry();
    const entry = await useCase.execute({ id, userId });
    return serializeEntry(entry);
  });
}

export async function getDashboardStatsAction(): Promise<ActionResult<DashboardStats>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeGetDashboardStats();
    return useCase.execute(userId);
  });
}
