import { describe, it, expect, beforeEach } from 'vitest';
import { EndMeeting } from '../end-meeting';
import { InMemoryMeetingsRepository } from '@/tests/repositories/in-memory-meetings.repository';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { makeMeeting } from '@/tests/factories/make-meeting';
import { makeEntry } from '@/tests/factories/make-entry';
import { MeetingNotFoundError } from '@/core/domain/errors/meeting-not-found.error';

describe('EndMeeting', () => {
  let sut: EndMeeting;
  let meetingsRepo: InMemoryMeetingsRepository;
  let entriesRepo: InMemoryEntriesRepository;

  beforeEach(() => {
    meetingsRepo = new InMemoryMeetingsRepository();
    entriesRepo = new InMemoryEntriesRepository();
    sut = new EndMeeting(meetingsRepo, entriesRepo);
  });

  describe('success scenarios', () => {
    it('should end a meeting and return summary', async () => {
      const meeting = makeMeeting({ name: 'Daily Standup' });
      await meetingsRepo.create(meeting);

      await entriesRepo.create(makeEntry({ meetingId: meeting.id, type: 'NOTE' }));
      await entriesRepo.create(makeEntry({ meetingId: meeting.id, type: 'TASK' }));
      await entriesRepo.create(makeEntry({ meetingId: meeting.id, type: 'TASK' }));
      await entriesRepo.create(makeEntry({ meetingId: meeting.id, type: 'LINK' }));

      const result = await sut.execute(meeting.id);

      expect(result.meeting.endedAt).toBeInstanceOf(Date);
      expect(result.summary.totalEntries).toBe(4);
      expect(result.summary.byType).toEqual({
        NOTE: 1,
        TASK: 2,
        LINK: 1,
      });
      expect(result.summary.duration).toBeGreaterThanOrEqual(0);
    });

    it('should return empty summary when no entries', async () => {
      const meeting = makeMeeting();
      await meetingsRepo.create(meeting);

      const result = await sut.execute(meeting.id);

      expect(result.summary.totalEntries).toBe(0);
      expect(result.summary.byType).toEqual({});
    });
  });

  describe('error scenarios', () => {
    it('should throw MeetingNotFoundError for non-existent meeting', async () => {
      await expect(sut.execute('non-existent-id')).rejects.toThrow(
        MeetingNotFoundError,
      );
    });
  });
});
