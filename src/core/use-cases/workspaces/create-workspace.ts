import { Workspace } from '@/core/domain/entities/workspace';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { generateSlug } from '@/shared/utils/slug.utils';

interface CreateWorkspaceRequest {
  name: string;
  color: string;
  icon?: string | null;
}

export class CreateWorkspace {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute(data: CreateWorkspaceRequest): Promise<Workspace> {
    const slug = generateSlug(data.name);

    const existing = await this.workspacesRepository.findBySlug(slug);
    if (existing) {
      const workspace = new Workspace({
        name: data.name,
        slug: `${slug}-${Date.now()}`,
        color: data.color,
        icon: data.icon ?? null,
      });
      return this.workspacesRepository.create(workspace);
    }

    const workspace = new Workspace({
      name: data.name,
      slug,
      color: data.color,
      icon: data.icon ?? null,
    });

    return this.workspacesRepository.create(workspace);
  }
}
