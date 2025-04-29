
"use client";

// This page reuses the main WishlistPage component but within the ProfileLayout
import WishlistPageContent from "@/app/wishlist/page";

export default function ProfileWishlistPage() {
  // The actual content and logic are handled by the imported WishlistPage component.
  // The ProfileLayout provides the sidebar and overall structure.
  // We might need to adjust padding/margins within the WishlistPageContent if needed.

  // The WishlistPage component itself handles header/footer, which might be redundant here.
  // Consider refactoring WishlistPage to be just the main content section
  // if Header/Footer are consistently provided by layouts.
  // For now, we render it as is. A small refactor could be to extract the main
  // part of WishlistPage into a separate component.

  // **Temporary approach (rendering the full page component):**
  // return <WishlistPageContent />;

  // **Refactored Approach (extracting main content - preferred):**
  // Assume WishlistPageContent is refactored to only return the <main> part.
  return (
      <div className="p-4 md:p-8">
         <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist</h1>
         {/* Here you'd include the refactored main content of the wishlist page */}
         {/* For demonstration, reusing the existing WishlistPage component logic,
             but this might lead to nested headers/footers. */}
         <WishlistMainContent />
      </div>
  );
}


// --- Inlined Refactored Wishlist Content (Example) ---
// This is what you'd extract from src/app/wishlist/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/wishlist-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartOff, ShoppingCart, X } from 'lucide-react'; // Added X
import { ProductCard } from '@/components/product-card';

function WishlistMainContent() {
   const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();

   return (
       <>
         {wishlistCount === 0 ? (
           <div className="text-center py-16 border rounded-lg bg-card mt-6">
             <HeartOff className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
             <p className="text-xl font-medium text-muted-foreground mb-4">Your wishlist is empty.</p>
             <p className="text-muted-foreground mb-6">Add items you love to your wishlist to save them for later.</p>
             <Button asChild size="lg">
               <Link href="/shop">Start Shopping</Link>
             </Button>
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
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
       </>
   );
 }
