import { Workspace } from '@/core/domain/entities/workspace';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';

export class ListWorkspaces {
  constructor(private workspacesRepository: WorkspacesRepository) {}

  async execute(): Promise<Workspace[]> {
    return this.workspacesRepository.findAll();
  }
}
