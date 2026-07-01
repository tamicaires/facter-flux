import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import type { Meeting } from '@/core/domain/entities/meeting';

interface ListMeetingsRequest {
  userId: string;
  workspaceId?: string;
  limit?: number;
}

export class ListMeetings {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: ListMeetingsRequest): Promise<Meeting[]> {
    if (data.workspaceId) {
      return this.meetingsRepository.findByWorkspaceId(data.workspaceId, data.userId);
    }

    if (data.limit) {
      return this.meetingsRepository.findRecent(data.userId, data.limit);
    }

    return this.meetingsRepository.findAll(data.userId);
  }
}
