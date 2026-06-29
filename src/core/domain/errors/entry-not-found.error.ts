import { DomainError } from './domain-error';

export class EntryNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Entry with id "${id}" not found`);
  }
}
