'use client';

import { useState, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Badge } from '@facter/ds-core';
import { useTags } from '@/features/tags/hooks/use-tags';

interface TagInputInlineProps {
  existingTags: string[];
  onAddTag: (tag: string) => void;
}

export function TagInputInline({ existingTags, onAddTag }: TagInputInlineProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: allTags } = useTags();

  const suggestions = allTags
    ?.filter((t) => !existingTags.includes(t.name))
    .filter((t) => value && t.name.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 5) ?? [];

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed || existingTags.includes(trimmed)) return;
    onAddTag(trimmed);
    setValue('');
    setIsEditing(false);
  }, [existingTags, onAddTag]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (value.trim()) {
        addTag(value);
      }
    }
    if (e.key === 'Escape') {
      e.stopPropagation();
      setValue('');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Badge
        variant="outline"
        className="cursor-pointer gap-1 border-dashed text-muted-foreground hover:text-foreground"
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <Plus className="h-3 w-3" />
        tag
      </Badge>
    );
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (value.trim()) {
            addTag(value);
          } else {
            setIsEditing(false);
          }
        }}
        placeholder="tag..."
        className="h-5 w-20 rounded border border-input bg-transparent px-1.5 text-xs outline-none focus:border-primary"
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 rounded-md border border-border bg-popover p-1 shadow-md">
          {suggestions.map((tag) => (
            <button
              key={tag.id}
              onMouseDown={(e) => {
                e.preventDefault();
                addTag(tag.name);
              }}
              className="block w-full rounded px-2 py-1 text-left text-xs hover:bg-accent"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
