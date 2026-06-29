import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { MeetingNotFoundError } from '@/core/domain/errors/meeting-not-found.error';
import type { Meeting } from '@/core/domain/entities/meeting';
import type { MeetingSummary } from '@/shared/types/meeting.types';

interface EndMeetingResult {
  meeting: Meeting;
  summary: MeetingSummary;
}

export class EndMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private entriesRepository: EntriesRepository,
  ) {}

  async execute(id: string): Promise<EndMeetingResult> {
    const meeting = await this.meetingsRepository.findById(id);
    if (!meeting) {
      throw new MeetingNotFoundError(id);
    }

    meeting.end();
    const updated = await this.meetingsRepository.update(meeting);

    const entries = await this.entriesRepository.findMany(
      { meetingId: id },
      { page: 1, perPage: 1000 },
    );

    const byType: Record<string, number> = {};
    for (const entry of entries.data) {
      byType[entry.type] = (byType[entry.type] ?? 0) + 1;
    }

    const duration = updated.endedAt
      ? updated.endedAt.getTime() - updated.startedAt.getTime()
      : 0;

    return {
      meeting: updated,
      summary: {
        totalEntries: entries.total,
        byType,
        duration,
      },
    };
  }
}
