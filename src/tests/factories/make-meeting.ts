import { Meeting, type MeetingProps } from '@/core/domain/entities/meeting';

export function makeMeeting(overrides: Partial<MeetingProps> = {}): Meeting {
  return new Meeting({
    name: 'Test Meeting',
    userId: '00000000-0000-0000-0000-000000000001',
    ...overrides,
  });
}
