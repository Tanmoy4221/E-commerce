
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/wishlist-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, HeartOff, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/product-card'; // Reuse ProductCard for consistent look

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>

        {wishlistCount === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-card">
            <HeartOff className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground mb-4">Your wishlist is empty.</p>
            <p className="text-muted-foreground mb-6">Add items you love to your wishlist to save them for later.</p>
            <Button asChild size="lg">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((item) => (
               <div key={item.id} className="relative group">
                 <ProductCard product={item} />
                  {/* Add a remove button overlay or within the card footer */}
                  <Button
                     variant="destructive"
                     size="icon"
                     className="absolute top-2 right-10 z-20 h-8 w-8 opacity-80 hover:opacity-100 transition-opacity" // Position near wishlist icon
                     onClick={() => removeFromWishlist(item.id)}
                     aria-label={`Remove ${item.name} from wishlist`}
                   >
                     <X className="h-4 w-4" />
                 </Button>
               </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
