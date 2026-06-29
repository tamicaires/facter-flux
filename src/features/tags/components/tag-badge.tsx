'use client';

import { Badge } from '@facter/ds-core';

interface TagBadgeProps {
  name: string;
  color?: string | null;
}

export function TagBadge({ name, color }: TagBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="text-xs"
      style={color ? { borderColor: color, color } : undefined}
    >
      #{name}
    </Badge>
  );
}
