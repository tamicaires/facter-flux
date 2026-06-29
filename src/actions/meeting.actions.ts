'use server';

import { z } from 'zod';
import {
  makeStartMeeting,
  makeEndMeeting,
  makeGetMeeting,
  makeListMeetings,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import { prisma } from '@/infra/database/prisma';
import type { SerializedMeeting, MeetingSummary } from '@/shared/types/meeting.types';

const startMeetingSchema = z.object({
  name: z.string().min(1),
  workspaceId: z.string().uuid().nullable().optional(),
});

function serializeMeetingRaw(raw: {
  id: string;
  name: string;
  workspaceId: string | null;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
  workspace?: { id: string; name: string; slug: string; color: string } | null;
}): SerializedMeeting {
  return {
    id: raw.id,
    name: raw.name,
    workspaceId: raw.workspaceId,
    startedAt: serializeDate(raw.startedAt),
    endedAt: raw.endedAt ? serializeDate(raw.endedAt) : null,
    createdAt: serializeDate(raw.createdAt),
    workspace: raw.workspace ?? null,
  };
}

async function fetchAndSerializeMeeting(id: string): Promise<SerializedMeeting> {
  const raw = await prisma.meeting.findUniqueOrThrow({
    where: { id },
    include: { workspace: true },
  });
  return serializeMeetingRaw(raw);
}

export async function startMeetingAction(
  input: z.infer<typeof startMeetingSchema>,
): Promise<ActionResult<SerializedMeeting>> {
  return handleAction(async () => {
    const data = startMeetingSchema.parse(input);
    const useCase = makeStartMeeting();
    const meeting = await useCase.execute(data);
    return fetchAndSerializeMeeting(meeting.id);
  });
}

export async function endMeetingAction(
  id: string,
): Promise<ActionResult<{ meeting: SerializedMeeting; summary: MeetingSummary }>> {
  return handleAction(async () => {
    const useCase = makeEndMeeting();
    const result = await useCase.execute(id);
    const serialized = await fetchAndSerializeMeeting(result.meeting.id);
    return { meeting: serialized, summary: result.summary };
  });
}

export async function getMeetingAction(
  id: string,
): Promise<ActionResult<SerializedMeeting>> {
  return handleAction(async () => {
    const useCase = makeGetMeeting();
    await useCase.execute(id);
    return fetchAndSerializeMeeting(id);
  });
}

export async function listMeetingsAction(
  workspaceId?: string,
): Promise<ActionResult<SerializedMeeting[]>> {
  return handleAction(async () => {
    const useCase = makeListMeetings();
    const meetings = await useCase.execute({ workspaceId });
    const serialized = await Promise.all(
      meetings.map((m) => fetchAndSerializeMeeting(m.id)),
    );
    return serialized;
  });
}

export async function getActiveMeetingAction(): Promise<ActionResult<SerializedMeeting | null>> {
  return handleAction(async () => {
    const active = await prisma.meeting.findFirst({
      where: { endedAt: null },
      orderBy: { startedAt: 'desc' },
      include: { workspace: true },
    });
    return active ? serializeMeetingRaw(active) : null;
  });
}

export async function listRecentMeetingsAction(
  limit: number = 5,
): Promise<ActionResult<SerializedMeeting[]>> {
  return handleAction(async () => {
    const useCase = makeListMeetings();
    const meetings = await useCase.execute({ limit });
    const serialized = await Promise.all(
      meetings.map((m) => fetchAndSerializeMeeting(m.id)),
    );
    return serialized;
  });
}
