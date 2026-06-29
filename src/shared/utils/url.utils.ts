import { ENVIRONMENT_PATTERNS } from '@/shared/constants/environment-patterns';

export function isValidUrl(text: string): boolean {
  try {
    const urlMatch = text.match(/https?:\/\/[^\s]+/);
    if (!urlMatch) return false;
    new URL(urlMatch[0]);
    return true;
  } catch {
    return false;
  }
}

export function extractUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
}

export function detectEnvironment(url: string): string | null {
  for (const { pattern, environment } of ENVIRONMENT_PATTERNS) {
    if (pattern.test(url)) {
      return environment;
    }
  }
  return null;
}

export function extractDomain(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

export function extractServiceName(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathSegments = parsed.pathname.split('/').filter(Boolean);

    if (pathSegments.length > 0) {
      return pathSegments[pathSegments.length - 1];
    }

    const subdomain = parsed.hostname.split('.')[0];
    if (subdomain && subdomain !== 'www') {
      return subdomain;
    }

    return null;
  } catch {
    return null;
  }
}

export function extractTagsFromUrl(url: string): string[] {
  const tags: string[] = [];

  try {
    const parsed = new URL(url);
    const subdomain = parsed.hostname.split('.')[0];
    if (subdomain && subdomain !== 'www' && subdomain.length > 2) {
      tags.push(subdomain);
    }

    const env = detectEnvironment(url);
    if (env) {
      tags.push(env);
    }
  } catch {
    // noop
  }

  return tags;
}
