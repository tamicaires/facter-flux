'use client';

import { X, FileText, Link2, CheckSquare, Code2 } from 'lucide-react';
import { Badge } from '@facter/ds-core';
import { TagInputInline } from './tag-input-inline';
import type { EntryType } from '@/shared/types/entry.types';

const TYPE_CONFIG: Record<EntryType, { label: string; icon: React.ElementType; variant: 'default' | 'secondary' | 'outline' }> = {
  NOTE: { label: 'Note', icon: FileText, variant: 'secondary' },
  LINK: { label: 'Link', icon: Link2, variant: 'default' },
  TASK: { label: 'Task', icon: CheckSquare, variant: 'default' },
  SNIPPET: { label: 'Snippet', icon: Code2, variant: 'secondary' },
};

interface SuggestionChipsProps {
  type: EntryType;
  tags: string[];
  assignee: string | null;
  workspace?: string | null;
  onRemoveTag: (tag: string) => void;
  onTypeChange: (type: EntryType) => void;
  onRemoveAssignee: () => void;
  onAddTag?: (tag: string) => void;
}

export function SuggestionChips({
  type,
  tags,
  assignee,
  workspace,
  onRemoveTag,
  onTypeChange,
  onRemoveAssignee,
  onAddTag,
}: SuggestionChipsProps) {
  const typeConfig = TYPE_CONFIG[type];
  const TypeIcon = typeConfig.icon;

  const typeOptions: EntryType[] = ['NOTE', 'LINK', 'TASK', 'SNIPPET'];
  const currentIndex = typeOptions.indexOf(type);

  const cycleType = () => {
    const next = typeOptions[(currentIndex + 1) % typeOptions.length];
    onTypeChange(next);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 px-1">
      <Badge
        variant={typeConfig.variant}
        className="cursor-pointer select-none gap-1"
        onClick={cycleType}
      >
        <TypeIcon className="h-3 w-3" />
        {typeConfig.label}
      </Badge>

      {assignee && (
        <Badge variant="outline" className="gap-1">
          <span className="text-xs">@{assignee}</span>
          <X className="h-3 w-3 cursor-pointer" onClick={onRemoveAssignee} />
        </Badge>
      )}

      {workspace && (
        <Badge variant="secondary" className="gap-1">
          <span className="text-xs">{workspace}</span>
        </Badge>
      )}

      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="gap-1">
          #{tag}
          <X className="h-3 w-3 cursor-pointer" onClick={() => onRemoveTag(tag)} />
        </Badge>
      ))}

      {onAddTag && (
        <TagInputInline existingTags={tags} onAddTag={onAddTag} />
      )}
    </div>
  );
}
