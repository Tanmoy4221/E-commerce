
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AddToCartButton } from './add-to-cart-button'; // Import AddToCartButton
import { WishlistButton } from './wishlist-button'; // Import WishlistButton

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const displayPrice = product.isOnSale ? product.price : product.price;
  const originalPrice = product.isOnSale ? product.originalPrice : null;
  const discountPercent = originalPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : null;

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md h-full flex flex-col group", className)}>
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
            <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name}>
                <span className="sr-only">{product.name}</span>
            </Link>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill // Use fill instead of width/height with AspectRatio
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy" // Enable lazy loading
            />
         </AspectRatio>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isOnSale && discountPercent && (
            <Badge variant="destructive">{discountPercent}% OFF</Badge>
          )}
           {product.stockStatus === 'Out of Stock' && (
             <Badge variant="secondary">Sold Out</Badge>
           )}
           {product.isFeatured && !product.isOnSale && ( // Only show if not already on sale
             <Badge variant="default">Featured</Badge>
           )}
        </div>
         {/* Wishlist Button */}
          <div className="absolute top-2 right-2 z-20">
             <WishlistButton
               product={product}
               showText={false}
               size="icon"
               variant="secondary" // Use secondary to stand out on image
               className="h-8 w-8 rounded-full bg-background/70 hover:bg-background text-muted-foreground hover:text-red-600 dark:hover:text-red-500"
             />
          </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
         <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <CardTitle className="text-base font-medium leading-tight mb-2">
           <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </Link>
        </CardTitle>
         <div className="flex items-center gap-2 text-sm mb-2">
           <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
              ))}
           </div>
            <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
         </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-primary">
              ${displayPrice.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         {/* Replace direct button with AddToCartButton component */}
         <AddToCartButton
            product={product}
            showText={true}
            size="default" // Or "sm" if preferred
            variant="outline"
            className="w-full transition-default hover:bg-primary hover:text-primary-foreground"
         />
      </CardFooter>
    </Card>
  );
}
