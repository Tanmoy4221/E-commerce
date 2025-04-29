
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number; // Optional maximum quantity (e.g., stock level)
  className?: string;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max,
  className,
  disabled = false,
}: QuantitySelectorProps) {

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (max === undefined || newQuantity <= max) {
      onQuantityChange(newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= min) {
      onQuantityChange(newQuantity);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
        let newQuantity = Math.max(min, value); // Ensure minimum value
        if (max !== undefined) {
            newQuantity = Math.min(max, newQuantity); // Ensure maximum value
        }
      onQuantityChange(newQuantity);
    } else if (event.target.value === '') {
         // Allow temporary empty state, default to min when blurred or submitted maybe?
         // For simplicity, let's just revert to min if input is cleared and blurred.
         // Or handle validation upstream. Let's stick to just updating if valid for now.
         onQuantityChange(min); // Or keep current quantity? Let's keep min.
    }
  };

   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
       if (event.target.value === '' || parseInt(event.target.value, 10) < min) {
           onQuantityChange(min);
       }
   };


  return (
    <div className={cn("flex items-center border rounded-md w-fit", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={handleDecrement}
        disabled={quantity <= min || disabled}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className="h-8 w-12 text-center border-0 border-l border-r rounded-none focus-visible:ring-0 px-1"
        aria-label="Quantity"
        disabled={disabled}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={handleIncrement}
        disabled={(max !== undefined && quantity >= max) || disabled}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
