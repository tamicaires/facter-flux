import { Workspace } from '@/core/domain/entities/workspace';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { WorkspaceNotFoundError } from '@/core/domain/errors';

interface UpdateWorkspaceRequest {
  id: string;
  name?: string;
  color?: string;
  icon?: string | null;
}

export class UpdateWorkspace {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute(data: UpdateWorkspaceRequest): Promise<Workspace> {
    const workspace = await this.workspacesRepository.findById(data.id);
    if (!workspace) {
      throw new WorkspaceNotFoundError(data.id);
    }

    if (data.name !== undefined) workspace.name = data.name;
    if (data.color !== undefined) workspace.color = data.color;
    if (data.icon !== undefined) workspace.icon = data.icon;
    workspace.updatedAt = new Date();

    return this.workspacesRepository.update(workspace);
  }
}
