import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Wolfixa',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Button render={<Link href="/" />} size="lg" className="rounded-full px-8">
        Go Back Home
      </Button>
    </div>
  );
}
