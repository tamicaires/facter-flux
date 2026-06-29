import type { SuggestionResult, EntryType } from '@/shared/types/entry.types';
import {
  isValidUrl,
  extractUrl,
  detectEnvironment,
  extractDomain,
  extractServiceName,
  extractTagsFromUrl,
} from '@/shared/utils/url.utils';
import {
  detectAssignee,
  startsWithActionVerb,
  extractHashtags,
  extractTechKeywords,
  isCodeSnippet,
  detectLanguage,
} from '@/shared/utils/text.utils';

export function suggestMetadata(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  if (isValidUrl(text)) {
    return suggestLink(text, workspaces);
  }

  const assigneeResult = detectAssignee(text);
  if (assigneeResult) {
    return suggestTaskWithAssignee(text, assigneeResult, workspaces);
  }

  if (isCodeSnippet(text)) {
    return suggestSnippet(text, workspaces);
  }

  if (startsWithActionVerb(text)) {
    return suggestTask(text, workspaces);
  }

  return suggestNote(text, workspaces);
}

function suggestLink(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  const url = extractUrl(text)!;
  const environment = detectEnvironment(url);
  const domain = extractDomain(url);
  const serviceName = extractServiceName(url);
  const urlTags = extractTagsFromUrl(url);
  const hashtags = extractHashtags(text);
  const techTags = extractTechKeywords(text);
  const workspace = guessWorkspace(text, workspaces);

  return {
    type: 'LINK',
    confidence: 0.95,
    tags: [...new Set([...urlTags, ...hashtags, ...techTags])],
    environment: environment ?? undefined,
    workspace: workspace ?? undefined,
    metadata: {
      url,
      domain: domain ?? undefined,
      serviceName: serviceName ?? undefined,
      environment: environment ?? undefined,
    },
  };
}

function suggestTaskWithAssignee(
  text: string,
  parsed: { assignee: string; content: string },
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  const hashtags = extractHashtags(text);
  const techTags = extractTechKeywords(parsed.content);
  const workspace = guessWorkspace(text, workspaces);

  return {
    type: 'TASK',
    confidence: 0.9,
    tags: [...new Set([...hashtags, ...techTags])],
    assignee: parsed.assignee,
    workspace: workspace ?? undefined,
  };
}

function suggestSnippet(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  const language = detectLanguage(text);
  const hashtags = extractHashtags(text);
  const workspace = guessWorkspace(text, workspaces);

  return {
    type: 'SNIPPET',
    confidence: 0.85,
    tags: [...new Set([...hashtags, ...(language ? [language] : [])])],
    workspace: workspace ?? undefined,
    metadata: {
      language: language ?? undefined,
    },
  };
}

function suggestTask(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  const hashtags = extractHashtags(text);
  const techTags = extractTechKeywords(text);
  const workspace = guessWorkspace(text, workspaces);

  return {
    type: 'TASK',
    confidence: 0.7,
    tags: [...new Set([...hashtags, ...techTags])],
    workspace: workspace ?? undefined,
  };
}

function suggestNote(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): SuggestionResult {
  const hashtags = extractHashtags(text);
  const techTags = extractTechKeywords(text);
  const workspace = guessWorkspace(text, workspaces);

  return {
    type: 'NOTE',
    confidence: 0.5,
    tags: [...new Set([...hashtags, ...techTags])],
    workspace: workspace ?? undefined,
  };
}

function guessWorkspace(
  text: string,
  workspaces?: Array<{ slug: string; name: string }>,
): string | null {
  if (!workspaces || workspaces.length === 0) return null;

  const lower = text.toLowerCase();
  for (const ws of workspaces) {
    if (lower.includes(ws.name.toLowerCase()) || lower.includes(ws.slug.toLowerCase())) {
      return ws.slug;
    }
  }

  return null;
}
