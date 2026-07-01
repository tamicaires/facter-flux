'use server';

import { suggestMetadata } from '@/infra/services/suggestion-engine';
import { makeListWorkspaces } from '@/infra/container';
import type { SuggestionResult } from '@/shared/types/entry.types';
import { getSessionUser } from '@/lib/get-session-user';

export async function suggestMetadataAction(text: string): Promise<SuggestionResult> {
  const { id: userId } = await getSessionUser();
  const useCase = makeListWorkspaces();
  const workspaces = await useCase.execute(userId);
  const wsData = workspaces.map((w) => ({ slug: w.slug, name: w.name }));
  return suggestMetadata(text, wsData);
}
