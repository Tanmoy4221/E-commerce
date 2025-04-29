
import Link from 'next/link';
import Image from 'next/image';
import { categories, type Category } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function CategoriesSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.slug}`} className="group block">
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <AspectRatio ratio={1 / 1}>
                     <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center p-2">
                       <h3 className="text-white text-center font-semibold text-sm md:text-base drop-shadow-md">
                         {category.name}
                       </h3>
                     </div>
                  </AspectRatio>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
