import { DomainError } from './domain-error';

export class MeetingNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Meeting with id "${id}" not found`);
  }
}
