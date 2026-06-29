import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import type { Meeting } from '@/core/domain/entities/meeting';

interface ListMeetingsRequest {
  workspaceId?: string;
  limit?: number;
}

export class ListMeetings {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: ListMeetingsRequest = {}): Promise<Meeting[]> {
    if (data.workspaceId) {
      return this.meetingsRepository.findByWorkspaceId(data.workspaceId);
    }

    if (data.limit) {
      return this.meetingsRepository.findRecent(data.limit);
    }

    return this.meetingsRepository.findAll();
  }
}
