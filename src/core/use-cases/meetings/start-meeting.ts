import { Meeting } from '@/core/domain/entities/meeting';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';

interface StartMeetingRequest {
  name: string;
  workspaceId?: string | null;
}

export class StartMeeting {
  constructor(private meetingsRepository: MeetingsRepository) {}

  async execute(data: StartMeetingRequest): Promise<Meeting> {
    const active = await this.meetingsRepository.findActive();
    if (active) {
      active.end();
      await this.meetingsRepository.update(active);
    }

    const meeting = new Meeting({
      name: data.name,
      workspaceId: data.workspaceId ?? null,
    });

    return this.meetingsRepository.create(meeting);
  }
}
