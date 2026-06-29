import { PrismaClient } from '@prisma/client';
import { Workspace } from '@/core/domain/entities/workspace';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';

export class PrismaWorkspacesRepository extends WorkspacesRepository {
  constructor(private prisma: PrismaClient) {
    super();
  }

  private toDomain(raw: Record<string, unknown>): Workspace {
    return new Workspace({
      id: raw.id as string,
      name: raw.name as string,
      slug: raw.slug as string,
      color: raw.color as string,
      icon: raw.icon as string | null,
      createdAt: raw.createdAt as Date,
      updatedAt: raw.updatedAt as Date,
    });
  }

  async findById(id: string): Promise<Workspace | null> {
    const raw = await this.prisma.workspace.findUnique({ where: { id } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findBySlug(slug: string): Promise<Workspace | null> {
    const raw = await this.prisma.workspace.findUnique({ where: { slug } });
    return raw ? this.toDomain(raw as unknown as Record<string, unknown>) : null;
  }

  async findAll(): Promise<Workspace[]> {
    const raw = await this.prisma.workspace.findMany({
      orderBy: { name: 'asc' },
    });
    return raw.map((w) => this.toDomain(w as unknown as Record<string, unknown>));
  }

  async create(workspace: Workspace): Promise<Workspace> {
    const raw = await this.prisma.workspace.create({
      data: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        color: workspace.color,
        icon: workspace.icon,
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async update(workspace: Workspace): Promise<Workspace> {
    const raw = await this.prisma.workspace.update({
      where: { id: workspace.id },
      data: {
        name: workspace.name,
        slug: workspace.slug,
        color: workspace.color,
        icon: workspace.icon,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workspace.delete({ where: { id } });
  }
}
