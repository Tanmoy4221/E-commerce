
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface WishlistButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
  showText?: boolean;
}

export function WishlistButton({ product, showText = true, className, size = "lg", variant = "outline", ...props }: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // Replace with actual state logic
  const { toast } = useToast();

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    const action = isInWishlist ? 'remove' : 'add';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));

    // In a real app, you'd dispatch an action to update wishlist state
    console.log(`${action === 'add' ? 'Added' : 'Removed'} ${product.name} ${action === 'add' ? 'to' : 'from'} wishlist`);
    setIsInWishlist(!isInWishlist); // Toggle local state

    setIsLoading(false);

    toast({
      title: `Item ${action === 'add' ? 'Added to' : 'Removed from'} Wishlist`,
      description: `${product.name} has been ${action === 'add' ? 'added to' : 'removed from'} your wishlist.`,
    });
  };

  return (
    <Button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={cn("transition-colors duration-300 w-full sm:w-auto",
                   isInWishlist ? 'text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-900/20' : '',
                   className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
         <Heart className={cn("mr-2 h-5 w-5", isInWishlist ? 'fill-current' : '')} />
      )}
       {showText && (
         <span>
           {isLoading ? (isInWishlist ? 'Removing...' : 'Adding...') : (isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')}
         </span>
       )}
       {!showText && <span className="sr-only">{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>}
    </Button>
  );
}
