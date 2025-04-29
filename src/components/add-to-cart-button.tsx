
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Check } from 'lucide-react';
import { useCart } from '@/context/cart-context'; // Import useCart
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
  showText?: boolean;
  quantity?: number; // Allow specifying quantity
}

export function AddToCartButton({ product, showText = true, className, size = "lg", quantity = 1, ...props }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart(); // Use the addToCart function from context

  const handleAddToCart = async () => {
    setIsLoading(true);
    setIsAdded(false);

    // Simulate a brief delay if needed (optional)
    await new Promise(resolve => setTimeout(resolve, 300)); // Reduced delay

    // Add item to cart using context function
    addToCart(product, quantity);

    setIsLoading(false);
    setIsAdded(true);

    // Reset the 'Added' state after a short delay for visual feedback
    setTimeout(() => {
      setIsAdded(false);
    }, 1500); // Shortened duration for feedback
  };

  const isDisabled = product.stockStatus === 'Out of Stock' || isLoading || isAdded;

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      size={size}
      className={cn("flex-1 transition-all duration-300",
                  isAdded ? 'bg-green-600 hover:bg-green-700' : '',
                  className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : isAdded ? (
         <Check className="mr-2 h-5 w-5" />
      ) : (
         <ShoppingCart className="mr-2 h-5 w-5" />
      )}
      {showText && (
         <span>
            {isLoading ? 'Adding...' : isAdded ? 'Added!' : product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
         </span>
      )}
      {!showText && <span className="sr-only">Add to Cart</span>}
    </Button>
  );
}
