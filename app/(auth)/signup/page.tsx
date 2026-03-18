'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created successfully!');
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-3xl border border-border shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join Wolfixa for exclusive access.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 6 characters"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12 rounded-xl font-semibold" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
