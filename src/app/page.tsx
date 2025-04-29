
"use client";

// Header and Footer are now handled by RootLayout
import { HeroCarousel } from '@/components/hero-carousel';
import { CategoriesSection } from '@/components/categories-section';
import { FeaturedProducts } from '@/components/featured-products';
import { FlashSale } from '@/components/flash-sale';
// Removed framer-motion import

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <main>
        {/* Removed motion.div wrappers */}
        <HeroCarousel />
        <CategoriesSection />
        <FeaturedProducts />
        <FlashSale />
      </main>
      {/* <Footer /> */}
    </>
  );
}
