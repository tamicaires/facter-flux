import { z } from 'zod';

export const tagSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(50),
  color: z.string().nullable().optional(),
  workspaceId: z.string().uuid().nullable().optional(),
  userId: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
});

export type TagProps = z.infer<typeof tagSchema>;
export type TagInput = z.input<typeof tagSchema>;

export class Tag {
  id: string;
  name: string;
  color: string | null;
  workspaceId: string | null;
  userId: string;
  createdAt: Date;

  constructor(data: TagInput) {
    const parsed = tagSchema.parse(data);
    this.id = parsed.id ?? crypto.randomUUID();
    this.name = parsed.name.toLowerCase();
    this.color = parsed.color ?? null;
    this.workspaceId = parsed.workspaceId ?? null;
    this.userId = parsed.userId;
    this.createdAt = parsed.createdAt;
  }
}
