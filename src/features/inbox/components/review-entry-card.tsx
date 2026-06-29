'use client';

import { useState } from 'react';
import { Check, Pin, Trash2, SkipForward } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '@facter/ds-core';
import { TagInputInline } from '@/features/capture/components/tag-input-inline';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import type { SerializedEntry, EntryType } from '@/shared/types/entry.types';

const TYPE_OPTIONS: { value: EntryType; label: string }[] = [
  { value: 'NOTE', label: 'Note' },
  { value: 'LINK', label: 'Link' },
  { value: 'TASK', label: 'Task' },
  { value: 'SNIPPET', label: 'Snippet' },
];

interface ReviewEntryCardProps {
  entry: SerializedEntry;
  isSubmitting: boolean;
  onProcess: (data: { workspaceId?: string | null; tags?: string[]; type?: EntryType }) => void;
  onPin: () => void;
  onDiscard: () => void;
  onSkip: () => void;
}

export function ReviewEntryCard({
  entry,
  isSubmitting,
  onProcess,
  onPin,
  onDiscard,
  onSkip,
}: ReviewEntryCardProps) {
  const [workspaceId, setWorkspaceId] = useState(entry.workspaceId ?? '');
  const [type, setType] = useState<EntryType>(entry.type);
  const [tags, setTags] = useState<string[]>(entry.tags.map((t) => t.name));
  const { data: workspaces } = useWorkspaces();

  const handleProcess = () => {
    onProcess({
      workspaceId: workspaceId || null,
      tags,
      type,
    });
  };

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6 space-y-4">
        <div className="text-base leading-relaxed">{entry.content}</div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo</label>
            <div className="flex gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setType(opt.value)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    type === opt.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace</label>
            <select
              value={workspaceId}
              onChange={(e) => setWorkspaceId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Nenhum</option>
              {workspaces?.map((ws) => (
                <option key={ws.id} value={ws.id}>{ws.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-0.5 text-muted-foreground hover:text-foreground"
                  >
                    x
                  </button>
                </Badge>
              ))}
              <TagInputInline existingTags={tags} onAddTag={handleAddTag} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button onClick={handleProcess} disabled={isSubmitting} className="gap-1.5">
            <Check className="h-4 w-4" />
            Processar
          </Button>
          <Button variant="outline" onClick={onPin} disabled={isSubmitting} className="gap-1.5">
            <Pin className="h-4 w-4" />
            Pin
          </Button>
          <Button variant="outline" onClick={onDiscard} disabled={isSubmitting} className="gap-1.5 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            Descartar
          </Button>
          <Button variant="ghost" onClick={onSkip} disabled={isSubmitting} className="gap-1.5 ml-auto">
            <SkipForward className="h-4 w-4" />
            Pular
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
