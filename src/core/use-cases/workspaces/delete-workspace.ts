import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { WorkspaceNotFoundError } from '@/core/domain/errors';

export class DeleteWorkspace {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute(id: string): Promise<void> {
    const workspace = await this.workspacesRepository.findById(id);
    if (!workspace) {
      throw new WorkspaceNotFoundError(id);
    }

    await this.workspacesRepository.delete(id);
  }
}
