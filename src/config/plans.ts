export const PLAN_LIMITS = {
  FREE: {
    maxWorkspaces: 3,
    maxEntriesPerMonth: 100,
    maxMeetingsPerMonth: 5,
  },
  PRO: {
    maxWorkspaces: Infinity,
    maxEntriesPerMonth: Infinity,
    maxMeetingsPerMonth: Infinity,
  },
  TEAM: {
    maxWorkspaces: Infinity,
    maxEntriesPerMonth: Infinity,
    maxMeetingsPerMonth: Infinity,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;
export type ResourceType = 'workspace' | 'entry' | 'meeting';

export function getPlanLimit(plan: PlanType, resource: ResourceType): number {
  switch (resource) {
    case 'workspace':
      return PLAN_LIMITS[plan].maxWorkspaces;
    case 'entry':
      return PLAN_LIMITS[plan].maxEntriesPerMonth;
    case 'meeting':
      return PLAN_LIMITS[plan].maxMeetingsPerMonth;
  }
}
