
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
  product: Product;
  showText?: boolean;
}

export function AddToCartButton({ product, showText = true, className, size = "lg", ...props }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsLoading(true);
    setIsAdded(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you'd dispatch an action to add to cart state (e.g., Redux, Zustand)
    console.log(`Added ${product.name} to cart`);

    setIsLoading(false);
    setIsAdded(true);

    toast({
      title: "Item Added to Cart",
      description: `${product.name} has been added to your cart.`,
      // action: <ToastAction altText="View Cart">View Cart</ToastAction>, // Add later if needed
    });

    // Reset the 'Added' state after a short delay
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
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
