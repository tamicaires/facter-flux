import { z } from 'zod';

export const meetingSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  workspaceId: z.string().uuid().nullable().optional(),
  userId: z.string().uuid(),
  startedAt: z.date().default(() => new Date()),
  endedAt: z.date().nullable().optional(),
  createdAt: z.date().default(() => new Date()),
});

export type MeetingProps = z.infer<typeof meetingSchema>;
export type MeetingInput = z.input<typeof meetingSchema>;

export class Meeting {
  id: string;
  name: string;
  workspaceId: string | null;
  userId: string;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;

  constructor(data: MeetingInput) {
    const parsed = meetingSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.name = parsed.name;
    this.workspaceId = parsed.workspaceId ?? null;
    this.userId = parsed.userId;
    this.startedAt = parsed.startedAt;
    this.endedAt = parsed.endedAt ?? null;
    this.createdAt = parsed.createdAt;
  }

  end(): void {
    this.endedAt = new Date();
  }
}
