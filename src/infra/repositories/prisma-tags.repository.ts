import { PrismaClient } from '@prisma/client';
import { Tag } from '@/core/domain/entities/tag';
import { TagsRepository } from '@/core/domain/repositories/tags.repository';

export class PrismaTagsRepository extends TagsRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): Tag {
    return new Tag({
      id: raw.id as string,
      name: raw.name as string,
      color: raw.color as string | null,
      workspaceId: raw.workspaceId as string | null,
      createdAt: raw.createdAt as Date,
    });
  }

  async findById(id: string): Promise<Tag | null> {
    const raw = await this.prisma.tag.findUnique({ where: { id } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findByName(name: string, workspaceId?: string | null): Promise<Tag | null> {
    const raw = await this.prisma.tag.findFirst({
      where: {
        name: name.toLowerCase(),
        workspaceId: workspaceId ?? null,
      },
    });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findAll(workspaceId?: string): Promise<Tag[]> {
    const where = workspaceId
      ? { OR: [{ workspaceId }, { workspaceId: null }] }
      : {};
    const raw = await this.prisma.tag.findMany({
      where,
      orderBy: { name: 'asc' },
    });
    return raw.map((t) => this.toDomain(t as unknown as Record<string, unknown>));
  }

  async create(tag: Tag): Promise<Tag> {
    const raw = await this.prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
        color: tag.color,
        workspaceId: tag.workspaceId,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async findOrCreate(name: string, workspaceId?: string | null): Promise<Tag> {
    const existing = await this.findByName(name, workspaceId);
    if (existing) return existing;

    const tag = new Tag({
      name,
      workspaceId: workspaceId ?? null,
    });
    return this.create(tag);
  }
}
