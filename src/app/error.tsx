
'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center min-h-screen">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h2 className="text-3xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
         {/* Display a generic message or error.message */}
         {error.message || "An unexpected error occurred. Please try again later."}
      </p>
      <Button
         size="lg"
         onClick={
           // Attempt to recover by trying to re-render the segment
           () => reset()
         }
      >
        Try again
      </Button>
       <Button size="lg" variant="link" className="mt-4" asChild>
          <a href="/">Go back home</a>
       </Button>
       {/* Consider adding a contact support button */}
    </div>
  );
}
