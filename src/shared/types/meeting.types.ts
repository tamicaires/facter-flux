export interface SerializedMeeting {
  id: string;
  name: string;
  workspaceId: string | null;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  workspace: { id: string; name: string; slug: string; color: string } | null;
}

export interface MeetingSummary {
  totalEntries: number;
  byType: Record<string, number>;
  duration: number;
}
