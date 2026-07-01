import { Meeting } from '@/core/domain/entities/meeting';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';

export class InMemoryMeetingsRepository extends MeetingsRepository {
  public items: Meeting[] = [];

  async findById(id: string, userId: string): Promise<Meeting | null> {
    return this.items.find((m) => m.id === id && m.userId === userId) ?? null;
  }

  async findActive(userId: string): Promise<Meeting | null> {
    return (
      [...this.items]
        .filter((m) => m.userId === userId && m.endedAt === null)
        .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())[0] ?? null
    );
  }

  async findAll(userId: string): Promise<Meeting[]> {
    return this.items
      .filter((m) => m.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  async findRecent(userId: string, limit: number): Promise<Meeting[]> {
    return this.items
      .filter((m) => m.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
      .slice(0, limit);
  }

  async findByWorkspaceId(workspaceId: string, userId: string): Promise<Meeting[]> {
    return this.items
      .filter((m) => m.workspaceId === workspaceId && m.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }

  async create(meeting: Meeting): Promise<Meeting> {
    this.items.push(meeting);
    return meeting;
  }

  async update(meeting: Meeting): Promise<Meeting> {
    const index = this.items.findIndex((m) => m.id === meeting.id);
    if (index !== -1) {
      this.items[index] = meeting;
    }
    return meeting;
  }
}
