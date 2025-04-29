
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { products, categories, Product, Category } from '@/lib/data';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, ListRestart } from 'lucide-react';
import { ShopFilters } from '@/components/shop-filters'; // Create this component
import { ShopPagination } from '@/components/shop-pagination'; // Create this component

interface ShopPageProps {
  searchParams: {
    page?: string;
    sort?: string;
    category?: string;
    brand?: string[]; // Allow multiple brands
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    search?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const sortBy = searchParams.sort || 'featured'; // default sort
  const selectedCategory = searchParams.category;
  const selectedBrands = Array.isArray(searchParams.brand) ? searchParams.brand : (searchParams.brand ? [searchParams.brand] : []);
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
       filteredProducts.reverse();
       break;
    case 'featured':
    default:
       // Keep original order or implement featured logic (e.g., based on isFeatured flag)
        filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
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
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Optional: Breadcrumbs */}
        {/* <div className="text-sm text-muted-foreground mb-4">Home / Shop {selectedCategory && `/ ${selectedCategory}`}</div> */}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5">
             <ShopFilters
                categories={categories}
                brands={allBrands}
                currentParams={searchParams}
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
                     <ShopFilters
                        categories={categories}
                        brands={allBrands}
                         currentParams={searchParams}
                         isMobile={true} // Pass prop to potentially adjust layout/close behaviour
                     />
                  </SheetContent>
               </Sheet>

                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
                </p>

               {/* Sort Dropdown */}
               <Select defaultValue={sortBy}>
                 <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Sort by" />
                 </SelectTrigger>
                 <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating-desc">Avg. Customer Rating</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                 </SelectContent>
               </Select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                 <p>No products found matching your criteria.</p>
                 {/* Optionally add a button to clear filters */}
                  <Button variant="link" asChild className="mt-4">
                     <a href="/shop">Clear Filters</a>
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
      <Footer />
    </>
  );
}
