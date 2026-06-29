export interface UrlMetadata {
  title: string | null;
  favicon: string | null;
}

export async function extractUrlMetadata(url: string): Promise<UrlMetadata> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'FacterNotes/1.0',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { title: null, favicon: null };
    }

    const html = await response.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const parsed = new URL(url);
    const favicon = `${parsed.protocol}//${parsed.hostname}/favicon.ico`;

    return { title, favicon };
  } catch {
    return { title: null, favicon: null };
  }
}
