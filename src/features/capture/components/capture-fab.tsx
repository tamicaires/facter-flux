'use client';

import { Plus } from 'lucide-react';

export function CaptureFab() {
  const handleClick = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95 transition-transform md:hidden"
      aria-label="Capturar"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}
