import { z } from 'zod';

export const workspaceSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  color: z.string().min(1),
  icon: z.string().nullable().optional(),
  userId: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type WorkspaceProps = z.infer<typeof workspaceSchema>;
export type WorkspaceInput = z.input<typeof workspaceSchema>;

export class Workspace {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: WorkspaceInput) {
    const parsed = workspaceSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.name = parsed.name;
    this.slug = parsed.slug;
    this.color = parsed.color;
    this.icon = parsed.icon ?? null;
    this.userId = parsed.userId;
    this.createdAt = parsed.createdAt;
    this.updatedAt = parsed.updatedAt;
  }
}
