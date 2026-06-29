import { NextRequest, NextResponse } from 'next/server';
import { extractUrlMetadata } from '@/infra/services/url-metadata-extractor';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const metadata = await extractUrlMetadata(url);
  return NextResponse.json(metadata);
}
