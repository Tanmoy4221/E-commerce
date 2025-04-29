
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Loader2 } from 'lucide-react'; // Use ShoppingBag for Buy Now
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BuyNowButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
  quantity?: number; // Allow specifying quantity
  // Add variant prop later if needed
}

export function BuyNowButton({ product, quantity = 1, className, size = "lg", ...props }: BuyNowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, cartItems } = useCart(); // Use the addToCart function from context
  const router = useRouter();
  const { toast } = useToast();

  const handleBuyNow = async () => {
    setIsLoading(true);

    try {
        // Check if the item is already in the cart with the same quantity
        // If not, add/update it. This ensures the correct item is ready for checkout.
        // Note: This logic assumes addToCart handles existing items by updating quantity.
        // If addToCart replaces the item, this check might not be needed.
        const existingItem = cartItems.find(item => item.id === product.id);
        if (!existingItem || existingItem.quantity !== quantity) {
           addToCart(product, quantity);
            // Brief delay to allow context state to potentially update before redirecting
            await new Promise(resolve => setTimeout(resolve, 100));
        }


      // Redirect to checkout page
      router.push('/checkout');

    } catch (error) {
      console.error("Buy Now failed:", error);
      toast({
        title: "Error",
        description: "Could not proceed to checkout. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false); // Only set loading false on error
    }

    // No need to set isLoading to false on success because of navigation
  };

  const isDisabled = product.stockStatus === 'Out of Stock' || isLoading;

  return (
    <Button
      onClick={handleBuyNow}
      disabled={isDisabled}
      size={size}
      // Use primary variant for stronger call to action
      variant="default"
      className={cn("flex-1 transition-all duration-300 w-full sm:w-auto",
                  className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
         <ShoppingBag className="mr-2 h-5 w-5" /> // Use ShoppingBag icon
      )}
      <span>
        {isLoading ? 'Processing...' : product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Buy Now'}
      </span>
    </Button>
  );
}
