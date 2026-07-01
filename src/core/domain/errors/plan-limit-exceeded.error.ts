import { DomainError } from './domain-error';

export class PlanLimitExceededError extends DomainError {
  constructor(resource: string, limit: number) {
    super(`Plan limit exceeded: maximum ${limit} ${resource}(s) allowed. Upgrade your plan to continue.`);
  }
}
