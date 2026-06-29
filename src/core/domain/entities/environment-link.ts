import { z } from 'zod';

export const environmentLinkSchema = z.object({
  id: z.string().uuid().optional(),
  workspaceId: z.string().uuid(),
  serviceName: z.string().min(1),
  environment: z.string().min(1),
  url: z.string().url(),
  order: z.number().int().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type EnvironmentLinkProps = z.infer<typeof environmentLinkSchema>;
export type EnvironmentLinkInput = z.input<typeof environmentLinkSchema>;

export class EnvironmentLink {
  id: string;
  workspaceId: string;
  serviceName: string;
  environment: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: EnvironmentLinkInput) {
    const parsed = environmentLinkSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.workspaceId = parsed.workspaceId;
    this.serviceName = parsed.serviceName;
    this.environment = parsed.environment;
    this.url = parsed.url;
    this.order = parsed.order;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }
}
