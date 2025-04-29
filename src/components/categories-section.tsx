
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { categories, type Category } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { ArrowRight } from 'lucide-react'; // Import an icon for the button


const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger animation
      duration: 0.4,
      ease: "easeOut"
    },
  }),
};

export function CategoriesSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
  index: number; // For animation stagger
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate" // Animate when card enters viewport
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once when 20% visible
      custom={index} // Pass index for stagger delay
      className="h-full" // Ensure motion div takes full height
    >
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative block overflow-hidden rounded-lg shadow-sm h-full" // Added h-full
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`Shop ${category.title}`} // Add title attribute for accessibility
      >
        <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl border-none h-full"> {/* Added h-full */}
          <CardContent className="p-0 relative h-full"> {/* Added h-full */}
            <AspectRatio ratio={3 / 4} className="h-full"> {/* Ensure AspectRatio fills CardContent */}
              <Image
                src={category.imageUrl}
                alt={category.name} // Use category name for alt text
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient Overlay from bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-20 text-white">
                 {/* Category Title */}
                 <h3 className="text-lg font-semibold mb-1 drop-shadow-md line-clamp-2">
                     {category.title} {/* Display the category title */}
                 </h3>

                 {/* Shop Now Button (revealed on hover) */}
                 <div
                   className={cn(
                      "transition-all duration-300 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 mt-2"
                   )}
                 >
                    <Button size="sm" variant="secondary" className="text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200" tabIndex={-1}>
                      Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                 </div>
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
