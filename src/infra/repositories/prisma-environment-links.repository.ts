import { PrismaClient } from '@prisma/client';
import { EnvironmentLink } from '@/core/domain/entities/environment-link';
import { EnvironmentLinksRepository } from '@/core/domain/repositories/environment-links.repository';

export class PrismaEnvironmentLinksRepository extends EnvironmentLinksRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): EnvironmentLink {
    return new EnvironmentLink({
      id: raw.id as string,
      workspaceId: raw.workspaceId as string,
      serviceName: raw.serviceName as string,
      environment: raw.environment as string,
      url: raw.url as string,
      order: raw.order as number,
      createdAt: raw.createdAt as Date,
      updatedAt: raw.updatedAt as Date,
    });
  }

  async findById(id: string): Promise<EnvironmentLink | null> {
    const raw = await this.prisma.environmentLink.findUnique({ where: { id } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findByWorkspace(workspaceId: string): Promise<EnvironmentLink[]> {
    const raw = await this.prisma.environmentLink.findMany({
      where: { workspaceId },
      orderBy: [{ serviceName: 'asc' }, { order: 'asc' }],
    });
    return raw.map((l) => this.toDomain(l as unknown as Record<string, unknown>));
  }

  async findAll(): Promise<EnvironmentLink[]> {
    const raw = await this.prisma.environmentLink.findMany({
      orderBy: [{ workspaceId: 'asc' }, { serviceName: 'asc' }, { order: 'asc' }],
      include: { workspace: true },
    });
    return raw.map((l) => this.toDomain(l as unknown as Record<string, unknown>));
  }

  async create(link: EnvironmentLink): Promise<EnvironmentLink> {
    const raw = await this.prisma.environmentLink.create({
      data: {
        id: link.id,
        workspaceId: link.workspaceId,
        serviceName: link.serviceName,
        environment: link.environment,
        url: link.url,
        order: link.order,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.environmentLink.delete({ where: { id } });
  }
}
