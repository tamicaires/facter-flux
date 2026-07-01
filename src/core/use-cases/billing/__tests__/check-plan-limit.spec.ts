import { describe, it, expect, beforeEach } from 'vitest';
import { CheckPlanLimit } from '../check-plan-limit';
import { InMemorySubscriptionsRepository } from '@/tests/repositories/in-memory-subscriptions.repository';
import { InMemoryWorkspacesRepository } from '@/tests/repositories/in-memory-workspaces.repository';
import { InMemoryEntriesRepository } from '@/tests/repositories/in-memory-entries.repository';
import { InMemoryMeetingsRepository } from '@/tests/repositories/in-memory-meetings.repository';
import { makeSubscription } from '@/tests/factories/make-subscription';
import { Workspace } from '@/core/domain/entities/workspace';
import { Entry } from '@/core/domain/entities/entry';
import { Meeting } from '@/core/domain/entities/meeting';
import { PlanLimitExceededError } from '@/core/domain/errors';

let subscriptionsRepo: InMemorySubscriptionsRepository;
let workspacesRepo: InMemoryWorkspacesRepository;
let entriesRepo: InMemoryEntriesRepository;
let meetingsRepo: InMemoryMeetingsRepository;
let sut: CheckPlanLimit;

describe('CheckPlanLimit', () => {
  beforeEach(() => {
    subscriptionsRepo = new InMemorySubscriptionsRepository();
    workspacesRepo = new InMemoryWorkspacesRepository();
    entriesRepo = new InMemoryEntriesRepository();
    meetingsRepo = new InMemoryMeetingsRepository();
    sut = new CheckPlanLimit(subscriptionsRepo, workspacesRepo, entriesRepo, meetingsRepo);
  });

  it('should allow creation when under workspace limit', async () => {
    await subscriptionsRepo.create(makeSubscription({ userId: '00000000-0000-0000-0000-000000000001', plan: 'FREE' }));
    workspacesRepo.items.push(
      new Workspace({ name: 'W1', slug: 'w1', color: '#000', userId: '00000000-0000-0000-0000-000000000001' }),
    );

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'workspace' }),
    ).resolves.toBeUndefined();
  });

  it('should throw when workspace limit exceeded on FREE plan', async () => {
    await subscriptionsRepo.create(makeSubscription({ userId: '00000000-0000-0000-0000-000000000001', plan: 'FREE' }));
    for (let i = 0; i < 3; i++) {
      workspacesRepo.items.push(
        new Workspace({ name: `W${i}`, slug: `w${i}`, color: '#000', userId: '00000000-0000-0000-0000-000000000001' }),
      );
    }

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'workspace' }),
    ).rejects.toBeInstanceOf(PlanLimitExceededError);
  });

  it('should allow unlimited workspaces on PRO plan', async () => {
    await subscriptionsRepo.create(makeSubscription({ userId: '00000000-0000-0000-0000-000000000001', plan: 'PRO' }));
    for (let i = 0; i < 10; i++) {
      workspacesRepo.items.push(
        new Workspace({ name: `W${i}`, slug: `w${i}`, color: '#000', userId: '00000000-0000-0000-0000-000000000001' }),
      );
    }

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'workspace' }),
    ).resolves.toBeUndefined();
  });

  it('should throw when entry limit exceeded on FREE plan', async () => {
    await subscriptionsRepo.create(makeSubscription({ userId: '00000000-0000-0000-0000-000000000001', plan: 'FREE' }));
    for (let i = 0; i < 100; i++) {
      entriesRepo.items.push(
        new Entry({ content: `Entry ${i}`, userId: '00000000-0000-0000-0000-000000000001', status: 'INBOX' }),
      );
    }

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'entry' }),
    ).rejects.toBeInstanceOf(PlanLimitExceededError);
  });

  it('should throw when meeting limit exceeded on FREE plan', async () => {
    await subscriptionsRepo.create(makeSubscription({ userId: '00000000-0000-0000-0000-000000000001', plan: 'FREE' }));
    for (let i = 0; i < 5; i++) {
      meetingsRepo.items.push(
        new Meeting({ name: `Meeting ${i}`, userId: '00000000-0000-0000-0000-000000000001' }),
      );
    }

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'meeting' }),
    ).rejects.toBeInstanceOf(PlanLimitExceededError);
  });

  it('should default to FREE plan when no subscription exists', async () => {
    for (let i = 0; i < 3; i++) {
      workspacesRepo.items.push(
        new Workspace({ name: `W${i}`, slug: `w${i}`, color: '#000', userId: '00000000-0000-0000-0000-000000000001' }),
      );
    }

    await expect(
      sut.execute({ userId: '00000000-0000-0000-0000-000000000001', resource: 'workspace' }),
    ).rejects.toBeInstanceOf(PlanLimitExceededError);
  });
});
