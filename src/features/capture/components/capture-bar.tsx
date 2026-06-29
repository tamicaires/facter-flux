'use client';

import { useRef, useEffect } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { useCapture } from '../hooks/use-capture';
import { SuggestionChips } from './suggestion-chips';
import type { EntryType } from '@/shared/types/entry.types';

export function CaptureBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    text,
    setText,
    isOpen,
    open,
    submit,
    isSubmitting,
    isSuggesting,
    suggestion,
    effectiveType,
    effectiveTags,
    effectiveAssignee,
    setOverrides,
    overrides,
    addTag,
  } = useCapture();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = overrides.tags ?? suggestion?.tags ?? [];
    setOverrides({ ...overrides, tags: currentTags.filter((t) => t !== tag) });
  };

  const handleTypeChange = (type: EntryType) => {
    setOverrides({ ...overrides, type });
  };

  const handleRemoveAssignee = () => {
    setOverrides({ ...overrides, assignee: null });
  };

  if (!isOpen) {
    return (
      <button
        onClick={open}
        className="hidden md:flex w-full items-center gap-2 rounded-lg border border-input bg-card px-4 py-3 text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        <Zap className="h-4 w-4" />
        <span>Ctrl+K para capturar...</span>
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-primary bg-card shadow-lg">
      <div className="flex items-center gap-2 p-3">
        {isSubmitting || isSuggesting ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Zap className="h-4 w-4 text-primary" />
        )}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite qualquer coisa..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          disabled={isSubmitting}
        />
      </div>

      {suggestion && text.length >= 3 && (
        <div className="border-t border-border px-3 py-2">
          <SuggestionChips
            type={effectiveType}
            tags={effectiveTags}
            assignee={effectiveAssignee}
            workspace={suggestion.workspace}
            onRemoveTag={handleRemoveTag}
            onTypeChange={handleTypeChange}
            onRemoveAssignee={handleRemoveAssignee}
            onAddTag={addTag}
          />
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span><kbd className="rounded border border-border px-1">Enter</kbd> Salvar</span>
            <span><kbd className="rounded border border-border px-1">Esc</kbd> Cancelar</span>
          </div>
        </div>
      )}
    </div>
  );
}
