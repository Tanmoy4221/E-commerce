
"use client"; // Add this directive

// Header and Footer are now handled by RootLayout
import { HeroCarousel } from '@/components/hero-carousel';
import { CategoriesSection } from '@/components/categories-section';
import { FeaturedProducts } from '@/components/featured-products';
import { FlashSale } from '@/components/flash-sale';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroCarousel />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoriesSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeaturedProducts />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FlashSale />
        </motion.div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
