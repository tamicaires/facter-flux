import { prisma } from './database/prisma';
import { PrismaEntriesRepository } from './repositories/prisma-entries.repository';
import { PrismaWorkspacesRepository } from './repositories/prisma-workspaces.repository';
import { PrismaTagsRepository } from './repositories/prisma-tags.repository';
import { PrismaMeetingsRepository } from './repositories/prisma-meetings.repository';
import { PrismaEnvironmentLinksRepository } from './repositories/prisma-environment-links.repository';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { PrismaSubscriptionsRepository } from './repositories/prisma-subscriptions.repository';
import { BcryptHashService } from './services/bcrypt-hash.service';
import { StripePaymentService } from './services/stripe-payment.service';

import { CreateEntry } from '@/core/use-cases/entries/create-entry';
import { ListEntries } from '@/core/use-cases/entries/list-entries';
import { UpdateEntry } from '@/core/use-cases/entries/update-entry';
import { DeleteEntry } from '@/core/use-cases/entries/delete-entry';
import { PinEntry } from '@/core/use-cases/entries/pin-entry';
import { ArchiveEntry } from '@/core/use-cases/entries/archive-entry';
import { SearchEntries } from '@/core/use-cases/entries/search-entries';
import { GetDashboardStats } from '@/core/use-cases/entries/get-dashboard-stats';

import { CreateWorkspace } from '@/core/use-cases/workspaces/create-workspace';
import { UpdateWorkspace } from '@/core/use-cases/workspaces/update-workspace';
import { DeleteWorkspace } from '@/core/use-cases/workspaces/delete-workspace';
import { ListWorkspaces } from '@/core/use-cases/workspaces/list-workspaces';

import { CreateTag } from '@/core/use-cases/tags/create-tag';
import { ListTags } from '@/core/use-cases/tags/list-tags';

import { CreateEnvironmentLink } from '@/core/use-cases/environment-links/create-environment-link';
import { ListEnvironmentLinks } from '@/core/use-cases/environment-links/list-environment-links';
import { DeleteEnvironmentLink } from '@/core/use-cases/environment-links/delete-environment-link';

import { StartMeeting } from '@/core/use-cases/meetings/start-meeting';
import { EndMeeting } from '@/core/use-cases/meetings/end-meeting';
import { GetMeeting } from '@/core/use-cases/meetings/get-meeting';
import { ListMeetings } from '@/core/use-cases/meetings/list-meetings';
import { GetActiveMeeting } from '@/core/use-cases/meetings/get-active-meeting';
import { ListRecentMeetings } from '@/core/use-cases/meetings/list-recent-meetings';

import { RegisterUser } from '@/core/use-cases/auth/register-user';
import { AuthenticateUser } from '@/core/use-cases/auth/authenticate-user';

import { CheckPlanLimit } from '@/core/use-cases/billing/check-plan-limit';
import { CreateCheckoutSession } from '@/core/use-cases/billing/create-checkout-session';
import { CreatePortalSession } from '@/core/use-cases/billing/create-portal-session';
import { HandleWebhookEvent } from '@/core/use-cases/billing/handle-webhook-event';

const entriesRepo = new PrismaEntriesRepository(prisma);
const workspacesRepo = new PrismaWorkspacesRepository(prisma);
const tagsRepo = new PrismaTagsRepository(prisma);
const meetingsRepo = new PrismaMeetingsRepository(prisma);
const environmentLinksRepo = new PrismaEnvironmentLinksRepository(prisma);
const usersRepo = new PrismaUsersRepository(prisma);
const subscriptionsRepo = new PrismaSubscriptionsRepository(prisma);
const hashService = new BcryptHashService();

let _paymentService: StripePaymentService | null = null;
function getPaymentService(): StripePaymentService {
  if (!_paymentService) {
    _paymentService = new StripePaymentService();
  }
  return _paymentService;
}

export function makeCreateEntry() {
  return new CreateEntry(entriesRepo, tagsRepo);
}

export function makeListEntries() {
  return new ListEntries(entriesRepo);
}

export function makeUpdateEntry() {
  return new UpdateEntry(entriesRepo, tagsRepo);
}

export function makeDeleteEntry() {
  return new DeleteEntry(entriesRepo);
}

export function makePinEntry() {
  return new PinEntry(entriesRepo);
}

export function makeArchiveEntry() {
  return new ArchiveEntry(entriesRepo);
}

export function makeSearchEntries() {
  return new SearchEntries(entriesRepo);
}

export function makeGetDashboardStats() {
  return new GetDashboardStats(entriesRepo);
}

export function makeCreateWorkspace() {
  return new CreateWorkspace(workspacesRepo);
}

export function makeUpdateWorkspace() {
  return new UpdateWorkspace(workspacesRepo);
}

export function makeDeleteWorkspace() {
  return new DeleteWorkspace(workspacesRepo);
}

export function makeListWorkspaces() {
  return new ListWorkspaces(workspacesRepo);
}

export function makeCreateTag() {
  return new CreateTag(tagsRepo);
}

export function makeListTags() {
  return new ListTags(tagsRepo);
}

export function makeCreateEnvironmentLink() {
  return new CreateEnvironmentLink(environmentLinksRepo, workspacesRepo);
}

export function makeListEnvironmentLinks() {
  return new ListEnvironmentLinks(environmentLinksRepo);
}

export function makeDeleteEnvironmentLink() {
  return new DeleteEnvironmentLink(environmentLinksRepo);
}

export function makeStartMeeting() {
  return new StartMeeting(meetingsRepo);
}

export function makeEndMeeting() {
  return new EndMeeting(meetingsRepo, entriesRepo);
}

export function makeGetMeeting() {
  return new GetMeeting(meetingsRepo);
}

export function makeListMeetings() {
  return new ListMeetings(meetingsRepo);
}

export function makeGetActiveMeeting() {
  return new GetActiveMeeting(meetingsRepo);
}

export function makeListRecentMeetings() {
  return new ListRecentMeetings(meetingsRepo);
}

export function makeRegisterUser() {
  return new RegisterUser(usersRepo, hashService);
}

export function makeAuthenticateUser() {
  return new AuthenticateUser(usersRepo, hashService);
}

export function makeCheckPlanLimit() {
  return new CheckPlanLimit(subscriptionsRepo, workspacesRepo, entriesRepo, meetingsRepo);
}

export function makeCreateCheckoutSession() {
  return new CreateCheckoutSession(subscriptionsRepo, getPaymentService());
}

export function makeCreatePortalSession() {
  return new CreatePortalSession(subscriptionsRepo, getPaymentService());
}

export function makeHandleWebhookEvent() {
  return new HandleWebhookEvent(subscriptionsRepo, getPaymentService());
}
