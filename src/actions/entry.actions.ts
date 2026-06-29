'use server';

import { z } from 'zod';
import {
  makeCreateEntry,
  makeUpdateEntry,
  makeDeleteEntry,
  makePinEntry,
  makeArchiveEntry,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import type { SerializedEntry } from '@/shared/types/entry.types';
import type { PaginatedResult } from '@/shared/types/common.types';
import { prisma } from '@/infra/database/prisma';

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

async function fetchAndSerializeEntry(entryId: string): Promise<SerializedEntry> {
  const raw = await prisma.entry.findUniqueOrThrow({
    where: { id: entryId },
    include: {
      tags: { include: { tag: true } },
      workspace: true,
    },
  });
  return serializeEntryRaw(raw);
}

function serializeEntryRaw(raw: {
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
  tags: Array<{ tag: { id: string; name: string; color: string | null } }>;
  workspace: { id: string; name: string; slug: string; color: string } | null;
}): SerializedEntry {
  return {
    id: raw.id,
    content: raw.content,
    type: raw.type as SerializedEntry['type'],
    status: raw.status as SerializedEntry['status'],
    workspaceId: raw.workspaceId,
    assignee: raw.assignee,
    pinned: raw.pinned,
    metadata: raw.metadata as SerializedEntry['metadata'],
    source: raw.source as SerializedEntry['source'],
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
  };
}

export async function createEntryAction(
  input: z.infer<typeof createEntrySchema>,
): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const data = createEntrySchema.parse(input);
    const useCase = makeCreateEntry();
    const entry = await useCase.execute(data);
    return fetchAndSerializeEntry(entry.id);
  });
}

export async function listEntriesAction(
  input: z.infer<typeof listEntriesSchema>,
): Promise<ActionResult<PaginatedResult<SerializedEntry>>> {
  return handleAction(async () => {
    const data = listEntriesSchema.parse(input);
    const skip = (data.page - 1) * data.perPage;

    const where: Record<string, unknown> = {};
    if (data.workspaceId) where.workspaceId = data.workspaceId;
    if (data.status) where.status = data.status;
    if (data.type) where.type = data.type;
    if (data.pinned !== undefined) where.pinned = data.pinned;
    if (data.meetingId) where.meetingId = data.meetingId;

    const [entries, total] = await Promise.all([
      prisma.entry.findMany({
        where,
        skip,
        take: data.perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: { include: { tag: true } },
          workspace: true,
        },
      }),
      prisma.entry.count({ where }),
    ]);

    return {
      data: entries.map(serializeEntryRaw),
      total,
      page: data.page,
      perPage: data.perPage,
      totalPages: Math.ceil(total / data.perPage),
    };
  });
}

export async function updateEntryAction(
  input: z.infer<typeof updateEntrySchema>,
): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const data = updateEntrySchema.parse(input);
    const useCase = makeUpdateEntry();
    const entry = await useCase.execute(data);
    return fetchAndSerializeEntry(entry.id);
  });
}

export async function deleteEntryAction(id: string): Promise<ActionResult<void>> {
  return handleAction(async () => {
    const useCase = makeDeleteEntry();
    await useCase.execute(id);
  });
}

export async function pinEntryAction(id: string): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const useCase = makePinEntry();
    const entry = await useCase.execute(id);
    return fetchAndSerializeEntry(entry.id);
  });
}

export async function archiveEntryAction(id: string): Promise<ActionResult<SerializedEntry>> {
  return handleAction(async () => {
    const useCase = makeArchiveEntry();
    const entry = await useCase.execute(id);
    return fetchAndSerializeEntry(entry.id);
  });
}

export interface DashboardStats {
  inboxCount: number;
  pinsCount: number;
  activeTasksCount: number;
  linksCount: number;
}

export async function getDashboardStatsAction(): Promise<ActionResult<DashboardStats>> {
  return handleAction(async () => {
    const [inboxCount, pinsCount, activeTasksCount, linksCount] = await Promise.all([
      prisma.entry.count({ where: { status: 'INBOX' } }),
      prisma.entry.count({ where: { pinned: true } }),
      prisma.entry.count({ where: { type: 'TASK', status: 'ACTIVE' } }),
      prisma.environmentLink.count(),
    ]);
    return { inboxCount, pinsCount, activeTasksCount, linksCount };
  });
}
