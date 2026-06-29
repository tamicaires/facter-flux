'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  Input,
} from '@facter/ds-core';
import { useSearch } from '../hooks/use-search';
import { SearchResults } from './search-results';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearch(query);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar entradas..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            Esc
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <SearchResults
            entries={data?.data ?? []}
            isLoading={isLoading}
            query={query}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
