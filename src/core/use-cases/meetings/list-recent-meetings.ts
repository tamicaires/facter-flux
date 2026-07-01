import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import type { Meeting } from '@/core/domain/entities/meeting';

interface ListRecentMeetingsRequest {
  userId: string;
  limit?: number;
}

export class ListRecentMeetings {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: ListRecentMeetingsRequest): Promise<Meeting[]> {
    return this.meetingsRepository.findRecent(data.userId, data.limit ?? 5);
  }
}
