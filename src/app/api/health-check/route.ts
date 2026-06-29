import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 },
    );
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 },
    );
  }

  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    const responseTime = Date.now() - start;

    return NextResponse.json({
      url,
      status: response.status,
      ok: response.ok,
      responseTime,
      redirected: response.redirected,
    });
  } catch (error) {
    const responseTime = Date.now() - start;
    const isTimeout = error instanceof DOMException && error.name === 'AbortError';

    return NextResponse.json({
      url,
      status: isTimeout ? 408 : 0,
      ok: false,
      responseTime,
      error: isTimeout ? 'Timeout' : 'Connection failed',
    });
  }
}
