import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { WorkspaceNotFoundError } from '@/core/domain/errors';

interface DeleteWorkspaceRequest {
  id: string;
  userId: string;
}

export class DeleteWorkspace {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute(data: DeleteWorkspaceRequest): Promise<void> {
    const workspace = await this.workspacesRepository.findById(data.id, data.userId);
    if (!workspace) {
      throw new WorkspaceNotFoundError(data.id);
    }

    await this.workspacesRepository.delete(data.id, data.userId);
  }
}
