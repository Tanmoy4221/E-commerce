
"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ListRestart, Star } from 'lucide-react';
import type { Category } from '@/lib/data';
import { Input } from './ui/input';

interface ShopFiltersProps {
  categories: Category[];
  brands: string[];
  currentParams: {
    category?: string;
    brand?: string[];
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
  };
  isMobile?: boolean; // Optional prop for mobile specific behaviour
}

const MAX_PRICE_DEFAULT = 1000; // Default max price for slider if none found

export function ShopFilters({ categories, brands, currentParams, isMobile }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for controlled components
  const [selectedCategory, setSelectedCategory] = useState(currentParams.category || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(currentParams.brand || []);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(currentParams.minPrice) || 0,
    Number(currentParams.maxPrice) || MAX_PRICE_DEFAULT
  ]);
  const [selectedRating, setSelectedRating] = useState(currentParams.rating || '0');

  // Update local state if URL params change (e.g., browser back/forward)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedBrands(searchParams.getAll('brand') || []);
    setPriceRange([
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || MAX_PRICE_DEFAULT
    ]);
    setSelectedRating(searchParams.get('rating') || '0');
  }, [searchParams]);


  const handleFilterChange = (updatedParams: Record<string, string | string[] | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries())); // Verbatim

       // Update or remove parameters
       Object.entries(updatedParams).forEach(([key, value]) => {
         if (value === undefined || (Array.isArray(value) && value.length === 0) || value === '') {
           current.delete(key);
           if (key === 'brand[]') current.delete('brand'); // Ensure 'brand' is also removed if brand[] is empty
         } else if (Array.isArray(value)) {
           current.delete(key); // Remove existing array params first
           current.delete(key.replace('[]', '')); // Remove potential non-array version too
           value.forEach(item => current.append(key.replace('[]', ''), item)); // Append each item without []
         } else {
           current.set(key, String(value));
         }
       });

     // Reset page to 1 when filters change
     current.set('page', '1');

     const search = current.toString();
     const query = search ? `?${search}` : "";
     router.push(`${pathname}${query}`, { scroll: false }); // Use scroll: false to prevent jumping to top
   };

   const handleBrandChange = (brand: string, checked: boolean) => {
      const newBrands = checked
        ? [...selectedBrands, brand]
        : selectedBrands.filter(b => b !== brand);
      setSelectedBrands(newBrands);
       handleFilterChange({ brand: newBrands });
   };

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
    };

    const handlePriceCommit = (value: [number, number]) => {
        handleFilterChange({ minPrice: String(value[0]), maxPrice: String(value[1]) });
    };

    const handleRatingChange = (value: string) => {
        setSelectedRating(value);
        handleFilterChange({ rating: value === '0' ? undefined : value }); // Remove rating param if 'Any' is selected
    };

   const handleCategoryChange = (slug: string) => {
       const newCategory = slug === selectedCategory ? '' : slug; // Toggle or clear
       setSelectedCategory(newCategory);
       handleFilterChange({ category: newCategory || undefined }); // Pass undefined to remove param
   }

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrands([]);
        setPriceRange([0, MAX_PRICE_DEFAULT]);
        setSelectedRating('0');
         // Navigate to base shop page
         router.push(pathname, { scroll: false });
    };


  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <h3 className="text-lg font-semibold">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary">
                <ListRestart className="mr-1 h-3 w-3"/>
                Clear All
            </Button>
       </div>

      <Accordion type="multiple" defaultValue={['category', 'brand', 'price', 'rating']} className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="space-y-2 pt-2"
            >
               <div className="flex items-center space-x-2">
                 <RadioGroupItem value="" id="cat-any" />
                 <Label htmlFor="cat-any" className="font-normal cursor-pointer">Any Category</Label>
               </div>
              {categories.map((category) => (
                 <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.slug} id={`cat-${category.slug}`} />
                  <Label htmlFor={`cat-${category.slug}`} className="font-normal cursor-pointer">{category.name}</Label>
                 </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger className="text-base font-medium">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2 max-h-60 overflow-y-auto pr-2">
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">{brand}</Label>
                    </div>
                ))}
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
             <div className="pt-4 px-1">
                <Slider
                    min={0}
                    max={MAX_PRICE_DEFAULT} // Adjust max based on actual product range if needed
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange} // Update visual state on drag
                    onValueCommit={handlePriceCommit} // Update URL only on commit (release)
                    className="mb-4"
                />
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}{priceRange[1] === MAX_PRICE_DEFAULT ? '+' : ''}</span>
                 </div>
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger className="text-base font-medium">Rating</AccordionTrigger>
          <AccordionContent>
             <RadioGroup
                value={selectedRating}
                onValueChange={handleRatingChange}
                className="space-y-2 pt-2"
             >
                {[4, 3, 2, 1, 0].map((rating) => (
                     <div key={rating} className="flex items-center space-x-2">
                         <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                         <Label htmlFor={`rating-${rating}`} className="font-normal cursor-pointer flex items-center gap-1">
                             {rating === 0 ? (
                                 'Any Rating'
                             ) : (
                                 <>
                                     {[...Array(5)].map((_, i) => (
                                         <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted stroke-muted-foreground'}`} />
                                     ))}
                                     & Up
                                 </>
                             )}
                         </Label>
                     </div>
                ))}
             </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
