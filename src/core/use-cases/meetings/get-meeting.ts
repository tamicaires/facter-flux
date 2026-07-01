import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import { MeetingNotFoundError } from '@/core/domain/errors/meeting-not-found.error';
import type { Meeting } from '@/core/domain/entities/meeting';

interface GetMeetingRequest {
  id: string;
  userId: string;
}

export class GetMeeting {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: GetMeetingRequest): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findById(data.id, data.userId);
    if (!meeting) {
      throw new MeetingNotFoundError(data.id);
    }
    return meeting;
  }
}
