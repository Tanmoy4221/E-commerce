
"use client";

// This page reuses the main WishlistContent component but within the ProfileLayout
import { WishlistContent } from "@/components/wishlist-content";

export default function ProfileWishlistPage() {
  // The actual content and logic are handled by the imported WishlistContent component.
  // The ProfileLayout provides the sidebar and overall structure.

  return (
      <div className="p-4 md:p-8">
         <h1 className="text-2xl md:text-3xl font-bold mb-0">My Wishlist</h1>
         {/* Render the reusable wishlist content component */}
         <WishlistContent />
      </div>
  );
}
