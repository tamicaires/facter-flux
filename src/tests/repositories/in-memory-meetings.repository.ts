import { Meeting } from '@/core/domain/entities/meeting';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';

export class InMemoryMeetingsRepository extends MeetingsRepository {
  public items: Meeting[] = [];

  async findById(id: string): Promise<Meeting | null> {
    return this.items.find((m) => m.id === id) ?? null;
  }

  async findActive(): Promise<Meeting | null> {
    return (
      [...this.items]
        .filter((m) => m.endedAt === null)
        .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())[0] ?? null
    );
  }

  async findAll(): Promise<Meeting[]> {
    return [...this.items].sort(
      (a, b) => b.startedAt.getTime() - a.startedAt.getTime(),
    );
  }

  async findRecent(limit: number): Promise<Meeting[]> {
    return [...this.items]
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
      .slice(0, limit);
  }

  async findByWorkspaceId(workspaceId: string): Promise<Meeting[]> {
    return this.items
      .filter((m) => m.workspaceId === workspaceId)
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
