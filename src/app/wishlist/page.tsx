
"use client";

import { WishlistContent } from "@/components/wishlist-content";

export default function WishlistPage() {
  return (
      // Header and Footer are now handled by RootLayout
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
        {/* Render the main content component */}
        <WishlistContent />
      </main>
  );
}
