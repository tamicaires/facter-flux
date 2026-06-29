import { z } from 'zod';

export const captureSchema = z.object({
  content: z.string().min(1, 'Digite algo para capturar'),
  type: z.enum(['NOTE', 'LINK', 'TASK', 'SNIPPET']).default('NOTE'),
  workspaceId: z.string().uuid().nullable().optional(),
  assignee: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.unknown()).nullable().optional(),
});

export type CaptureFormData = z.infer<typeof captureSchema>;
