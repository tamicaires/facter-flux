import { DomainError } from './domain-error';

export class DuplicateTagError extends DomainError {
  constructor(name: string) {
    super(`Tag "${name}" already exists`);
  }
}
