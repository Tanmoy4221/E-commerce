
"use client";

import { useState, useEffect } from 'react';
import { getFlashSaleProducts, Product } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Timer } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.5,
         ease: "easeOut"
      }
    },
  };


  return (
    <motion.section
      className="py-8 md:py-12 bg-gradient-to-r from-primary/10 to-accent/10"
      initial="hidden" // Use hidden instead of initial for consistency
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once
      variants={containerVariants} // Apply container variants
    >
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
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants} // Apply container variants here too if needed
        >
          {products.map((product) => (
             <motion.div key={product.id} variants={itemVariants}>
                 <ProductCard product={product} />
             </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
