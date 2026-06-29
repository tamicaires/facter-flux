import { DomainError } from './domain-error';

export class WorkspaceNotFoundError extends DomainError {
  constructor(identifier: string) {
    super(`Workspace "${identifier}" not found`);
  }
}
