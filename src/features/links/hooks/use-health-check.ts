'use client';

import { useState, useCallback } from 'react';

export interface HealthResult {
  url: string;
  status: number;
  ok: boolean;
  responseTime: number;
  error?: string;
  redirected?: boolean;
}

type HealthStatus = 'idle' | 'checking' | 'done';

export function useHealthCheck() {
  const [results, setResults] = useState<Map<string, HealthResult>>(new Map());
  const [status, setStatus] = useState<HealthStatus>('idle');

  const checkUrl = useCallback(async (url: string): Promise<HealthResult> => {
    const response = await fetch(
      `/api/health-check?url=${encodeURIComponent(url)}`,
    );
    return response.json() as Promise<HealthResult>;
  }, []);

  const checkAll = useCallback(async (urls: string[]) => {
    setStatus('checking');
    const newResults = new Map<string, HealthResult>();

    const checks = urls.map(async (url) => {
      const result = await checkUrl(url);
      newResults.set(url, result);
      setResults(new Map(newResults));
    });

    await Promise.allSettled(checks);
    setStatus('done');
  }, [checkUrl]);

  const getResult = useCallback((url: string): HealthResult | undefined => {
    return results.get(url);
  }, [results]);

  return {
    results,
    status,
    checkAll,
    checkUrl,
    getResult,
  };
}
