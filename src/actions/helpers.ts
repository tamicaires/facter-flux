'use server';

import { DomainError, UnauthorizedError } from '@/core/domain/errors';
import type { ActionResult } from './types';

export type { ActionResult };

export async function handleAction<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return { success: false, error: 'Not authenticated' };
    }
    if (error instanceof DomainError) {
      return { success: false, error: error.message };
    }
    console.error('Unexpected error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
