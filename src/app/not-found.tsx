
import Link from 'next/link';
// Header and Footer are now handled by RootLayout
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      {/* Header and Footer are handled by RootLayout */}
      <main className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center flex-grow">
         <Frown className="h-20 w-20 text-primary mb-6" />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
               <Link href="/contact">Contact Support</Link>
            </Button>
        </div>
      </main>
    </>
  );
}
