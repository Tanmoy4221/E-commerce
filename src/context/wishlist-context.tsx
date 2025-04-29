
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
       try {
         const parsedWishlist = JSON.parse(storedWishlist);
         // Basic validation: check if it's an array
         if (Array.isArray(parsedWishlist)) {
              // Further validation: check if items have expected properties (id is enough for wishlist)
              const validItems = parsedWishlist.filter(item =>
                 typeof item === 'object' && item !== null && typeof item.id === 'string'
             );
              setWishlistItems(validItems);
         } else {
             console.warn("Invalid wishlist data found in localStorage. Resetting wishlist.");
             localStorage.removeItem('wishlistItems');
         }
       } catch (error) {
         console.error("Failed to parse wishlist items from localStorage", error);
         localStorage.removeItem('wishlistItems'); // Clear corrupted data
       }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
     if (wishlistItems.length > 0) {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
     } else {
        // Clear localStorage if wishlist is empty
        localStorage.removeItem('wishlistItems');
     }
  }, [wishlistItems]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        // Already in wishlist, do nothing (or show a message)
        return prevItems;
      }
      return [...prevItems, product];
    });
    toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
    });
  }, [toast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast({
        title: "Removed from Wishlist",
        description: `Item has been removed from your wishlist.`,
         variant: "destructive",
    });
  }, [toast]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
