import { Meeting } from '../entities/meeting';

export abstract class MeetingsRepository {
  abstract findById(id: string): Promise<Meeting | null>;
  abstract findActive(): Promise<Meeting | null>;
  abstract findAll(): Promise<Meeting[]>;
  abstract findRecent(limit: number): Promise<Meeting[]>;
  abstract findByWorkspaceId(workspaceId: string): Promise<Meeting[]>;
  abstract create(meeting: Meeting): Promise<Meeting>;
  abstract update(meeting: Meeting): Promise<Meeting>;
}
