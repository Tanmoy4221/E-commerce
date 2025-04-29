
import { getFeaturedProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  if (!featuredProducts || featuredProducts.length === 0) {
    return null; // Don't render section if no featured products
  }

  return (
    <section className="py-8 md:py-12 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
