'use client';

import { Search } from 'lucide-react';
import { Navbar, ThemeToggle, useSidebar } from '@facter/ds-core';

interface ResponsiveNavbarProps {
  onSearchClick?: () => void;
}

export function ResponsiveNavbar({ onSearchClick }: ResponsiveNavbarProps) {
  const { expanded, pinned, isMobile, collapsedWidth, expandedWidth } = useSidebar();
  const marginLeft = isMobile ? 0 : (pinned && expanded ? expandedWidth : collapsedWidth);

  return (
    <Navbar
      className="transition-[margin-left] duration-300"
      style={{ marginLeft, width: `calc(100% - ${marginLeft}px)` }}
    >
      <div className="flex-1" />
      <button
        onClick={onSearchClick}
        className="flex w-full max-w-md items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Buscar...</span>
        <kbd className="ml-auto hidden rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground sm:inline-block">
          Ctrl+F
        </kbd>
      </button>
      <div className="flex-1" />
      <ThemeToggle />
    </Navbar>
  );
}
