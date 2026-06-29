import { Meeting, type MeetingProps } from '@/core/domain/entities/meeting';

export function makeMeeting(overrides: Partial<MeetingProps> = {}): Meeting {
  return new Meeting({
    name: 'Test Meeting',
    ...overrides,
  });
}
