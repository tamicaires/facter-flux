import { SubscriptionsRepository } from '@/core/domain/repositories/subscriptions.repository';
import { EntriesRepository } from '@/core/domain/repositories/entries.repository';
import { WorkspacesRepository } from '@/core/domain/repositories/workspaces.repository';
import { MeetingsRepository } from '@/core/domain/repositories/meetings.repository';
import { PlanLimitExceededError } from '@/core/domain/errors';
import { getPlanLimit, type ResourceType, type PlanType } from '@/config/plans';

interface CheckPlanLimitRequest {
  userId: string;
  resource: ResourceType;
}

export class CheckPlanLimit {
  constructor(
    private subscriptionsRepository: SubscriptionsRepository,
    private workspacesRepository: WorkspacesRepository,
    private entriesRepository: EntriesRepository,
    private meetingsRepository: MeetingsRepository,
  ) {}

  async execute(data: CheckPlanLimitRequest): Promise<void> {
    const subscription = await this.subscriptionsRepository.findByUserId(data.userId);
    const plan: PlanType = subscription?.plan ?? 'FREE';
    const limit = getPlanLimit(plan, data.resource);

    if (limit === Infinity) return;

    let currentUsage: number;

    switch (data.resource) {
      case 'workspace': {
        const workspaces = await this.workspacesRepository.findAll(data.userId);
        currentUsage = workspaces.length;
        break;
      }
      case 'entry': {
        const stats = await this.entriesRepository.getDashboardStats(data.userId);
        currentUsage = stats.inboxCount + stats.pinsCount + stats.activeTasksCount;
        break;
      }
      case 'meeting': {
        const meetings = await this.meetingsRepository.findAll(data.userId);
        currentUsage = meetings.length;
        break;
      }
    }

    if (currentUsage >= limit) {
      throw new PlanLimitExceededError(data.resource, limit);
    }
  }
}
