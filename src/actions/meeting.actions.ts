'use server';

import { z } from 'zod';
import {
  makeStartMeeting,
  makeEndMeeting,
  makeGetMeeting,
  makeListMeetings,
  makeGetActiveMeeting,
  makeListRecentMeetings,
  makeCheckPlanLimit,
} from '@/infra/container';
import { handleAction } from './helpers';
import type { ActionResult } from './types';
import { serializeDate } from '@/shared/utils/serialize.utils';
import type { SerializedMeeting, MeetingSummary } from '@/shared/types/meeting.types';
import { getSessionUser } from '@/lib/get-session-user';
import { env } from '@/config/env';

const startMeetingSchema = z.object({
  name: z.string().min(1),
  workspaceId: z.string().uuid().nullable().optional(),
});

function serializeMeeting(meeting: {
  id: string;
  name: string;
  workspaceId: string | null;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
}): SerializedMeeting {
  return {
    id: meeting.id,
    name: meeting.name,
    workspaceId: meeting.workspaceId,
    startedAt: serializeDate(meeting.startedAt),
    endedAt: meeting.endedAt ? serializeDate(meeting.endedAt) : null,
    createdAt: serializeDate(meeting.createdAt),
    workspace: null,
  };
}

export async function startMeetingAction(
  input: z.infer<typeof startMeetingSchema>,
): Promise<ActionResult<SerializedMeeting>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    if (env.BILLING_ENABLED) await makeCheckPlanLimit().execute({ userId, resource: 'meeting' });
    const data = startMeetingSchema.parse(input);
    const useCase = makeStartMeeting();
    const meeting = await useCase.execute({ ...data, userId });
    return serializeMeeting(meeting);
  });
}

export async function endMeetingAction(
  id: string,
): Promise<ActionResult<{ meeting: SerializedMeeting; summary: MeetingSummary }>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeEndMeeting();
    const result = await useCase.execute({ id, userId });
    return { meeting: serializeMeeting(result.meeting), summary: result.summary };
  });
}

export async function getMeetingAction(
  id: string,
): Promise<ActionResult<SerializedMeeting>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeGetMeeting();
    const meeting = await useCase.execute({ id, userId });
    return serializeMeeting(meeting);
  });
}

export async function listMeetingsAction(
  workspaceId?: string,
): Promise<ActionResult<SerializedMeeting[]>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeListMeetings();
    const meetings = await useCase.execute({ userId, workspaceId });
    return meetings.map(serializeMeeting);
  });
}

export async function getActiveMeetingAction(): Promise<ActionResult<SerializedMeeting | null>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeGetActiveMeeting();
    const meeting = await useCase.execute(userId);
    return meeting ? serializeMeeting(meeting) : null;
  });
}

export async function listRecentMeetingsAction(
  limit: number = 5,
): Promise<ActionResult<SerializedMeeting[]>> {
  return handleAction(async () => {
    const { id: userId } = await getSessionUser();
    const useCase = makeListRecentMeetings();
    const meetings = await useCase.execute({ userId, limit });
    return meetings.map(serializeMeeting);
  });
}
