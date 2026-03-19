'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/lib/store/cartStore';
import { useUserStore } from '@/lib/store/userStore';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);
  const { user, setUser } = useUserStore();
  const supabase = createClient();

  // Handle scroll for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Fetch full profile info
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUser({
                id: data.id,
                email: data.email,
                full_name: data.full_name,
                role: data.role,
              });
            }
          });
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          setUser(null);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [setUser, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/60 backdrop-blur-xl border-b border-border/40'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-tighter">
          Wolfixa.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" render={<Link href="/cart" />} className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="hidden md:flex" />}>
                <UserCircle className="w-5 h-5" />
                <span className="sr-only">User menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 pt-2">
                  <p className="text-sm font-medium">{user.full_name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  Dashboard
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem render={<Link href="/admin" />}>
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button render={<Link href="/login" />} variant="default" className="hidden md:flex rounded-full">
              Log In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-border pt-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="px-2">
                        <p className="font-medium">{user.full_name || 'User'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-2 text-primary hover:underline hover:text-primary/80"
                      >
                        Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-2 text-primary hover:underline hover:text-primary/80"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center px-2 text-destructive hover:underline"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  ) : (
                    <Button render={<Link href="/login" />} className="w-full">
                      Log In / Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
