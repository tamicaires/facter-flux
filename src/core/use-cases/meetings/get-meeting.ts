import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import { MeetingNotFoundError } from '@/core/domain/errors/meeting-not-found.error';
import type { Meeting } from '@/core/domain/entities/meeting';

export class GetMeeting {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(id: string): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findById(id);
    if (!meeting) {
      throw new MeetingNotFoundError(id);
    }
    return meeting;
  }
}
