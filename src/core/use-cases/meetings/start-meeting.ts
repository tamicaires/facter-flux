import { Meeting } from '@/core/domain/entities/meeting';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';

interface StartMeetingRequest {
  name: string;
  workspaceId?: string | null;
  userId: string;
}

export class StartMeeting {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: StartMeetingRequest): Promise<Meeting> {
    const active = await this.meetingsRepository.findActive(data.userId);
    if (active) {
      active.end();
      await this.meetingsRepository.update(active);
    }

    const meeting = new Meeting({
      name: data.name,
      workspaceId: data.workspaceId ?? null,
      userId: data.userId,
    });

    return this.meetingsRepository.create(meeting);
  }
}
