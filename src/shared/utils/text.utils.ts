import { ALL_ACTION_VERBS } from '@/shared/constants/action-verbs';
import { TECH_KEYWORDS } from '@/shared/constants/tech-keywords';

const ASSIGNEE_PATTERN = /^([A-Z][A-Za-zÀ-ú]+):\s+(.+)$/;
const AT_ASSIGNEE_PATTERN = /^@(\w+)\s+(.+)$/;
const HASHTAG_PATTERN = /#([a-zA-Z0-9_-]+)/g;
const CODE_PATTERNS = [/```/, /\(\)\s*=>/, /function\s+\w+/, /^const\s+/, /^import\s+/, /\{[\s\S]*\}/, /=>\s*\{/];

export function detectAssignee(text: string): { assignee: string; content: string } | null {
  const match = text.match(ASSIGNEE_PATTERN) ?? text.match(AT_ASSIGNEE_PATTERN);
  if (match) {
    return { assignee: match[1], content: match[2] };
  }
  return null;
}

export function startsWithActionVerb(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return ALL_ACTION_VERBS.some(
    (verb) => lower.startsWith(verb + ' ') || lower.startsWith(verb + ':'),
  );
}

export function containsActionVerb(text: string): boolean {
  const lower = text.toLowerCase();
  return ALL_ACTION_VERBS.some((verb) => lower.includes(verb));
}

export function extractHashtags(text: string): string[] {
  const matches = text.matchAll(HASHTAG_PATTERN);
  return [...matches].map((m) => m[1].toLowerCase());
}

export function extractTechKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const words = lower.split(/[\s,;.:!?()\[\]{}"']+/);
  return TECH_KEYWORDS.filter((keyword) => words.includes(keyword));
}

export function isCodeSnippet(text: string): boolean {
  return CODE_PATTERNS.some((pattern) => pattern.test(text));
}

export function detectLanguage(text: string): string | null {
  if (/\b(const|let|var|function|=>|import\s+{)\b/.test(text)) return 'typescript';
  if (/\b(def\s+\w+|import\s+\w+|from\s+\w+|print\()\b/.test(text)) return 'python';
  if (/\b(func\s+\w+|package\s+\w+|fmt\.)\b/.test(text)) return 'go';
  if (/\b(fn\s+\w+|let\s+mut|println!)\b/.test(text)) return 'rust';
  if (/<\w+[^>]*>.*<\/\w+>/.test(text)) return 'html';
  if (/\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b/i.test(text)) return 'sql';
  if (/^\s*[\w-]+\s*:\s*.+/m.test(text) && /^\s*(FROM|RUN|CMD|COPY)\b/m.test(text)) return 'dockerfile';
  if (/^\s*[\w-]+:\s*$/m.test(text)) return 'yaml';
  return null;
}
