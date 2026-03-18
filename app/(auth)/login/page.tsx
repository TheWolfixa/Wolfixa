'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful!');
      router.push('/dashboard');
      router.refresh(); // Refresh to update layouts
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-3xl border border-border shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Log in to your Wolfixa account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-semibold" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
