import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import type { Meeting } from '@/core/domain/entities/meeting';

export class GetActiveMeeting {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(userId: string): Promise<Meeting | null> {
    return this.meetingsRepository.findActive(userId);
  }
}
