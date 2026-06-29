export interface SerializedWorkspace {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
  entryCount?: number;
}
