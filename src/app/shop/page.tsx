

// Header and Footer are now handled by RootLayout
import Link from 'next/link'; // Import Link
import { ProductCard } from '@/components/product-card';
import { products, categories, Product, Category } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from 'lucide-react';
import { ShopFilters } from '@/components/shop-filters';
import { ShopPagination } from '@/components/shop-pagination';
import { ShopSortDropdown } from '@/components/shop-sort-dropdown'; // Import the new Sort component

interface ShopPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    category?: string;
    brand?: string | string[]; // Can be single or multiple
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    search?: string;
  };
}

const ITEMS_PER_PAGE = 12;

// Function to safely get brands as an array
const getBrandsArray = (brandParam: string | string[] | undefined): string[] => {
  if (!brandParam) return [];
  if (Array.isArray(brandParam)) return brandParam;
  return [brandParam];
};


export default async function ShopPage({ searchParams }: ShopPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const sortBy = searchParams.sort || 'featured'; // default sort
  const selectedCategory = searchParams.category;
  // Use the helper function to always get an array
   const selectedBrands = getBrandsArray(searchParams.brand);
  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || 10000; // Adjust max default if needed
  const minRating = Number(searchParams.rating) || 0;
  const searchQuery = searchParams.search?.toLowerCase();

  // --- Filtering Logic ---
   let filteredProducts = products;

   // Search query filter
   if (searchQuery) {
     filteredProducts = filteredProducts.filter(p =>
       p.name.toLowerCase().includes(searchQuery) ||
       p.description.toLowerCase().includes(searchQuery) ||
       p.category.toLowerCase().includes(searchQuery) ||
       p.brand.toLowerCase().includes(searchQuery)
     );
   }


   // Category filter
   if (selectedCategory) {
     filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
   }

   // Brand filter (multiple)
   if (selectedBrands.length > 0) {
     const lowerCaseBrands = selectedBrands.map(b => b.toLowerCase());
     filteredProducts = filteredProducts.filter(p => lowerCaseBrands.includes(p.brand.toLowerCase()));
   }

   // Price filter
   filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

   // Rating filter
   filteredProducts = filteredProducts.filter(p => p.rating >= minRating);


  // --- Sorting Logic ---
  switch (sortBy) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-asc':
       filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
     case 'name-desc':
       filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
       break;
    case 'newest': // Assuming IDs are somewhat sequential or have a date added field later
      // Simple reverse for now, replace with date logic if available
       filteredProducts.reverse(); // Placeholder - needs date field for real implementation
       break;
    case 'featured':
    default:
       // Sort by featured first, then potentially by another metric like rating or ID
        filteredProducts.sort((a, b) => {
            const featuredA = a.isFeatured ? 1 : 0;
            const featuredB = b.isFeatured ? 1 : 0;
            if (featuredB !== featuredA) {
                return featuredB - featuredA; // Featured items first
            }
            // Optional: Add secondary sort criteria (e.g., rating) if needed
             return b.rating - a.rating;
        });
       break;
  }

  // --- Pagination Logic ---
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

   // Extract unique brands for filtering
   const allBrands = Array.from(new Set(products.map(p => p.brand))).sort();


  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Optional: Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-1">/</span>
             <Link href="/shop" className={`hover:text-primary ${!selectedCategory ? 'font-medium text-foreground' : ''}`}>Shop</Link>
             {selectedCategory && (
                <>
                 <span className="mx-1">/</span>
                 <span className="font-medium text-foreground capitalize">{selectedCategory.replace('-', ' ')}</span>
                </>
             )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5">
             <ShopFilters
                categories={categories}
                brands={allBrands}
                 // Pass the original searchParams object
                 currentParams={{
                    category: selectedCategory,
                    brand: selectedBrands,
                    minPrice: String(minPrice),
                    maxPrice: String(maxPrice),
                    rating: String(minRating),
                 }}
             />
          </aside>

          {/* Products Grid & Controls */}
          <div className="flex-1">
             {/* Mobile Filters Trigger & Sort Dropdown */}
            <div className="flex items-center justify-between mb-6">
               {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" className="md:hidden">
                       <Filter className="mr-2 h-4 w-4" /> Filters
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-xs overflow-y-auto p-4">
                      {/* Pass the original searchParams object */}
                     <ShopFilters
                        categories={categories}
                        brands={allBrands}
                         currentParams={{
                             category: selectedCategory,
                             brand: selectedBrands,
                             minPrice: String(minPrice),
                             maxPrice: String(maxPrice),
                             rating: String(minRating),
                         }}
                         isMobile={true} // Pass prop to potentially adjust layout/close behaviour
                     />
                  </SheetContent>
               </Sheet>

                 {totalItems > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
                      {searchQuery && <span> for "{searchQuery}"</span>}
                    </p>
                 ) : (
                    <p className="text-sm text-muted-foreground">
                       {searchQuery ? `No results found for "${searchQuery}"` : 'No products found'}
                    </p>
                 )}


               {/* Sort Dropdown - Use the new component */}
               <ShopSortDropdown />
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground border rounded-lg bg-card">
                 <p className="text-xl mb-4">No products found matching your criteria.</p>
                 {/* Optionally add a button to clear filters */}
                  <Button variant="link" asChild className="mt-4">
                     <Link href="/shop">Clear Filters & Search</Link>
                  </Button>
              </div>
            )}

            {/* Pagination */}
             {totalPages > 1 && (
                <ShopPagination currentPage={currentPage} totalPages={totalPages} />
             )}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
