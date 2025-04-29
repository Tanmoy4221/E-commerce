
"use client"; // Add client directive for Framer Motion

import { getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { motion } from 'framer-motion'; // Import framer-motion

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  if (!featuredProducts || featuredProducts.length === 0) {
    return null; // Don't render section if no featured products
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
      className="py-8 md:py-12 bg-secondary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once 20% is visible
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Featured Products</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants} // Apply container variants here too if needed, or just rely on parent stagger
        >
          {featuredProducts.map((product) => (
             <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
             </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
