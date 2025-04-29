
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroCarousel } from '@/components/hero-carousel';
import { CategoriesSection } from '@/components/categories-section';
import { FeaturedProducts } from '@/components/featured-products';
import { FlashSale } from '@/components/flash-sale';
// import { Testimonials } from '@/components/testimonials'; // Optional

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <CategoriesSection />
        <FeaturedProducts />
        <FlashSale />
        {/* <Testimonials /> */} {/* Optional: Add testimonials section later */}
      </main>
      <Footer />
    </>
  );
}
