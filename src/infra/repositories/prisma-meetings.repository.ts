import { PrismaClient } from '@prisma/client';
import { Meeting } from '@/core/domain/entities/meeting';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';

export class PrismaMeetingsRepository extends MeetingsRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): Meeting {
    return new Meeting({
      id: raw.id as string,
      name: raw.name as string,
      workspaceId: raw.workspaceId as string | null,
      userId: raw.userId as string,
      startedAt: raw.startedAt as Date,
      endedAt: raw.endedAt as Date | null,
      createdAt: raw.createdAt as Date,
    });
  }

  async findById(id: string, userId: string): Promise<Meeting | null> {
    const raw = await this.prisma.meeting.findFirst({ where: { id, userId } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findActive(userId: string): Promise<Meeting | null> {
    const raw = await this.prisma.meeting.findFirst({
      where: { userId, endedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findAll(userId: string): Promise<Meeting[]> {
    const raw = await this.prisma.meeting.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
    });
    return raw.map((m) => this.toDomain(m as unknown as Record<string, unknown>));
  }

  async findRecent(userId: string, limit: number): Promise<Meeting[]> {
    const raw = await this.prisma.meeting.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
    return raw.map((m) => this.toDomain(m as unknown as Record<string, unknown>));
  }

  async findByWorkspaceId(workspaceId: string, userId: string): Promise<Meeting[]> {
    const raw = await this.prisma.meeting.findMany({
      where: { workspaceId, userId },
      orderBy: { startedAt: 'desc' },
    });
    return raw.map((m) => this.toDomain(m as unknown as Record<string, unknown>));
  }

  async create(meeting: Meeting): Promise<Meeting> {
    const raw = await this.prisma.meeting.create({
      data: {
        id: meeting.id,
        name: meeting.name,
        workspaceId: meeting.workspaceId,
        userId: meeting.userId,
        startedAt: meeting.startedAt,
        endedAt: meeting.endedAt,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async update(meeting: Meeting): Promise<Meeting> {
    const raw = await this.prisma.meeting.update({
      where: { id: meeting.id },
      data: {
        name: meeting.name,
        workspaceId: meeting.workspaceId,
        endedAt: meeting.endedAt,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }
}
