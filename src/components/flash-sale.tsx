
"use client";

import { useState, useEffect } from 'react';
import { getFlashSaleProducts, Product } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Timer } from 'lucide-react';

export function FlashSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const saleProducts = getFlashSaleProducts();
    setProducts(saleProducts);

    // Find the earliest end date among the sale products
    const earliestEndDate = saleProducts.reduce((earliest, p) => {
       if (!p.saleEndDate) return earliest;
       return !earliest || p.saleEndDate < earliest ? p.saleEndDate : earliest;
     }, null as Date | null);


    if (earliestEndDate) {
      const calculateTimeLeft = () => {
        const difference = +earliestEndDate - +new Date();
        let timeLeftData = null;

        if (difference > 0) {
          timeLeftData = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
         setTimeLeft(timeLeftData);
         return difference; // Return difference for interval clearing
      };

      const difference = calculateTimeLeft();
       if (difference > 0) {
          const timer = setInterval(() => {
            const newDifference = calculateTimeLeft();
             if (newDifference <= 0) {
               clearInterval(timer);
               // Optionally refetch products or update state when sale ends
               setProducts(getFlashSaleProducts()); // Re-check for ongoing sales
             }
          }, 1000);

          return () => clearInterval(timer);
       }
    }
  }, []);

  if (products.length === 0 || !timeLeft) {
    return null; // Don't render if no flash sale products or timer hasn't initialized/ended
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
           <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-0 flex items-center gap-2">
              <Timer className="h-7 w-7" />
             Flash Sale Ending Soon!
           </h2>
           {timeLeft && (
             <div className="flex items-center gap-2 font-mono text-lg md:text-xl font-semibold">
              <div className="text-center bg-background/80 p-2 rounded-md shadow-sm min-w-[50px]">
                 <div className="text-sm text-muted-foreground">Days</div>
                 <div>{String(timeLeft.days).padStart(2, '0')}</div>
              </div>
               <span className="text-primary">:</span>
               <div className="text-center bg-background/80 p-2 rounded-md shadow-sm min-w-[50px]">
                 <div className="text-sm text-muted-foreground">Hrs</div>
                 <div>{String(timeLeft.hours).padStart(2, '0')}</div>
               </div>
                <span className="text-primary">:</span>
               <div className="text-center bg-background/80 p-2 rounded-md shadow-sm min-w-[50px]">
                  <div className="text-sm text-muted-foreground">Min</div>
                 <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
               </div>
               <span className="text-primary">:</span>
               <div className="text-center bg-background/80 p-2 rounded-md shadow-sm min-w-[50px]">
                  <div className="text-sm text-muted-foreground">Sec</div>
                 <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
               </div>
             </div>
           )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

