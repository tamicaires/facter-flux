'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Input, Logo } from '@facter/ds-core';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    if (result?.error) {
      setFormError('Invalid email or password');
      setIsLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-col items-center gap-2">
        <Logo width={32} color="hsl(var(--primary))" />
        <h1 className="text-xl font-semibold">Sign in to Facter Flux</h1>
        <p className="text-sm text-muted-foreground">
          Quick capture & intelligent organization
        </p>
      </div>

      {(error || formError) && (
        <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {formError || 'An error occurred during sign in. Please try again.'}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('google', { callbackUrl })}
        >
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('github', { callbackUrl })}
        >
          Continue with GitHub
        </Button>
      </div>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </Card>
  );
}
