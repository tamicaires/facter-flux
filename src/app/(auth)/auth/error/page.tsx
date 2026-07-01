'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Logo } from '@facter/ds-core';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'Access denied. You do not have permission.',
  Verification: 'The verification link has expired or has already been used.',
  Default: 'An unexpected error occurred. Please try again.',
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('error') ?? 'Default';
  const message = errorMessages[errorType] ?? errorMessages.Default;

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-col items-center gap-2">
        <Logo width={32} color="hsl(var(--destructive))" />
        <h1 className="text-xl font-semibold">Authentication Error</h1>
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      </div>

      <Button asChild className="w-full">
        <Link href="/auth/login">Back to login</Link>
      </Button>
    </Card>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  );
}
