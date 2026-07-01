import { describe, it, expect, beforeEach } from 'vitest';
import { StartMeeting } from '../start-meeting';
import { InMemoryMeetingsRepository } from '@/tests/repositories/in-memory-meetings.repository';

describe('StartMeeting', () => {
  let sut: StartMeeting;
  let meetingsRepo: InMemoryMeetingsRepository;

  beforeEach(() => {
    meetingsRepo = new InMemoryMeetingsRepository();
    sut = new StartMeeting(meetingsRepo);
  });

  describe('success scenarios', () => {
    it('should create a meeting with name', async () => {
      const meeting = await sut.execute({ name: 'Daily Martech', userId: '00000000-0000-0000-0000-000000000001' });

      expect(meeting.name).toBe('Daily Martech');
      expect(meeting.id).toBeDefined();
      expect(meeting.userId).toBe('00000000-0000-0000-0000-000000000001');
      expect(meeting.startedAt).toBeInstanceOf(Date);
      expect(meeting.endedAt).toBeNull();
      expect(meetingsRepo.items).toHaveLength(1);
    });

    it('should create a meeting with workspaceId', async () => {
      const meeting = await sut.execute({
        name: 'Sprint Planning',
        workspaceId: '550e8400-e29b-41d4-a716-446655440000',
        userId: '00000000-0000-0000-0000-000000000001',
      });

      expect(meeting.workspaceId).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should set workspaceId to null when not provided', async () => {
      const meeting = await sut.execute({ name: 'Quick Sync', userId: '00000000-0000-0000-0000-000000000001' });

      expect(meeting.workspaceId).toBeNull();
    });
  });
});
