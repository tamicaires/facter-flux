import { Meeting } from '../entities/meeting';

export abstract class MeetingsRepository {
  abstract findById(id: string, userId: string): Promise<Meeting | null>;
  abstract findActive(userId: string): Promise<Meeting | null>;
  abstract findAll(userId: string): Promise<Meeting[]>;
  abstract findRecent(userId: string, limit: number): Promise<Meeting[]>;
  abstract findByWorkspaceId(workspaceId: string, userId: string): Promise<Meeting[]>;
  abstract create(meeting: Meeting): Promise<Meeting>;
  abstract update(meeting: Meeting): Promise<Meeting>;
}
