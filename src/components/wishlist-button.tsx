
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useWishlist } from '@/context/wishlist-context'; // Import useWishlist
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface WishlistButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
  showText?: boolean;
}

export function WishlistButton({ product, showText = true, className, size = "lg", variant = "outline", ...props }: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // Use wishlist context
  const [isCurrentlyInWishlist, setIsCurrentlyInWishlist] = useState(false);

   // Sync local state with context state initially and when context changes
   useEffect(() => {
     setIsCurrentlyInWishlist(isInWishlist(product.id));
   }, [isInWishlist, product.id]);


  const handleToggleWishlist = async () => {
    setIsLoading(true);

    // Simulate a brief delay (optional)
    await new Promise(resolve => setTimeout(resolve, 300)); // Reduced delay

    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }

    setIsLoading(false);
    // Local state will update via the useEffect hook when context changes
  };

  return (
    <Button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={cn("transition-colors duration-300 w-full sm:w-auto",
                   isCurrentlyInWishlist ? 'text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-900/20' : '',
                   className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
         <Heart className={cn("mr-2 h-5 w-5", isCurrentlyInWishlist ? 'fill-current' : '')} />
      )}
       {showText && (
         <span>
           {isLoading ? (isCurrentlyInWishlist ? 'Removing...' : 'Adding...') : (isCurrentlyInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')}
         </span>
       )}
       {!showText && <span className="sr-only">{isCurrentlyInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>}
    </Button>
  );
}
