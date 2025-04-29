
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

   // Load cart from localStorage on initial render
   useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Basic validation: check if it's an array
        if (Array.isArray(parsedCart)) {
             // Further validation: check if items have expected properties
             const validItems = parsedCart.filter(item =>
                typeof item === 'object' &&
                item !== null &&
                typeof item.id === 'string' &&
                typeof item.quantity === 'number' &&
                item.quantity > 0
            );
             setCartItems(validItems);
        } else {
             console.warn("Invalid cart data found in localStorage. Resetting cart.");
             localStorage.removeItem('cartItems');
        }
      } catch (error) {
         console.error("Failed to parse cart items from localStorage", error);
         localStorage.removeItem('cartItems'); // Clear corrupted data
      }
    }
   }, []);

   // Save cart to localStorage whenever it changes
   useEffect(() => {
     if (cartItems.length > 0) {
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
     } else {
        // Clear localStorage if cart is empty to avoid storing empty array string
        localStorage.removeItem('cartItems');
     }
   }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
     toast({
        title: "Item Added to Cart",
        description: `${product.name} has been added to your cart.`,
     });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
     toast({
        title: "Item Removed",
        description: `Item has been removed from your cart.`,
        variant: "destructive",
     });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
        title: "Cart Cleared",
        description: `Your shopping cart has been emptied.`,
    });
  }, [toast]);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
