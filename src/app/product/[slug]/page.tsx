
'use client'; // Changed to client component for state management

import { useState, useEffect, useCallback } from 'react'; // Import useState, useEffect, useCallback
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle, Truck, RotateCw, BrainCircuit } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getReviewsForProduct, Product, Review, products as allProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductImageGallery } from '@/components/product-image-gallery';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { WishlistButton } from '@/components/wishlist-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductReviews } from '@/components/product-reviews';
import { productSuggestionsFlow } from '@/ai/flows/product-suggestions-flow';
import { BuyNowButton } from '@/components/buy-now-button';
import { QuantitySelector } from '@/components/quantity-selector'; // Import QuantitySelector
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Extract slug directly outside useEffect
  const slug = params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aiSuggestedProducts, setAiSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isLoadingAISuggestions, setIsLoadingAISuggestions] = useState(true);

  // Fetch product data
  useEffect(() => {
    const loadData = async () => {
      if (!slug) return; // Add guard if slug might be undefined initially
      setIsLoading(true);
      // Use the extracted slug variable
      const fetchedProduct = getProductBySlug(slug); // Simulate async fetch if needed

      if (!fetchedProduct) {
        // Handle not found in client component
        // Option 1: Redirect using next/navigation
        // router.replace('/not-found'); // Import and use useRouter
        // Option 2: Set state to show a not found message (simpler here)
        setProduct(null); // Or a specific 'notFound' state
      } else {
        setProduct(fetchedProduct);
        setRelatedProducts(getRelatedProducts(fetchedProduct));
        setReviews(getReviewsForProduct(fetchedProduct.id));
        // Set default variants
        setSelectedColor(fetchedProduct.variants?.colors?.[0]);
        setSelectedSize(fetchedProduct.variants?.sizes?.[0]);
      }
      setIsLoading(false);
    };
    loadData();
    // Use the extracted slug variable in the dependency array
  }, [slug]);

   // Fetch AI suggestions after product data is loaded
   useEffect(() => {
     const getAiSuggestions = async (currentProduct: Product) => {
       setIsLoadingAISuggestions(true);
       try {
         const suggestionsResult = await productSuggestionsFlow({
           productName: currentProduct.name,
           productDescription: currentProduct.description,
           category: currentProduct.category,
           brand: currentProduct.brand,
           price: currentProduct.price,
           limit: 4, // Request 4 suggestions
         });

         // Map suggested slugs back to full product objects
         const suggestedProducts = suggestionsResult.suggestedProductSlugs
           .map(slug => allProducts.find(p => p.slug === slug))
           .filter((p): p is Product => p !== undefined && p.id !== currentProduct.id); // Filter out undefined and the current product

         setAiSuggestedProducts(suggestedProducts);
       } catch (error) {
         console.error("Error fetching AI product suggestions:", error);
         setAiSuggestedProducts([]); // Return empty array on error
       } finally {
          setIsLoadingAISuggestions(false);
       }
     };

     if (product) {
       getAiSuggestions(product);
     }
   }, [product]); // Re-run when product changes

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  // --- Render Logic ---

  if (isLoading) {
    // Basic Skeleton Loading State
    return (
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           {/* Image Gallery Skeleton */}
           <div className="space-y-4">
             <Skeleton className="w-full aspect-square rounded-lg" />
             <div className="grid grid-cols-5 gap-2">
               {[...Array(5)].map((_, i) => <Skeleton key={i} className="w-full aspect-square rounded" />)}
             </div>
           </div>
           {/* Product Details Skeleton */}
           <div className="space-y-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
              <Separator />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-10 w-1/2" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Skeleton className="h-11 flex-1" />
                  <Skeleton className="h-11 flex-1" />
              </div>
               <Skeleton className="h-11 w-full" />
              <Separator />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
           </div>
        </div>
      </main>
    );
  }

  if (!product) {
    // Handle case where product wasn't found after loading
    // This replaces the server-side notFound() for client components
    return (
         <main className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center flex-grow">
             <h1 className="text-3xl font-semibold mb-4">Product Not Found</h1>
             <p className="text-lg text-muted-foreground mb-8 max-w-md">
             Sorry, we couldn't find the product you were looking for.
             </p>
             <Button asChild>
             <Link href="/shop">Continue Shopping</Link>
             </Button>
         </main>
     );
  }

  const displayPrice = product.isOnSale ? product.price : product.price;
  const originalPrice = product.isOnSale ? product.originalPrice : null;

   // Create a product object with selected variants for cart/buy now
   const productWithOptions = {
     ...product,
     // Add selected variant info if needed by cart logic
     // This example assumes base product is added, variants handled conceptually
   };

  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Details */}
          <div className="space-y-4">
            {/* Category/Brand */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <span>{product.category}</span>
                 <Separator orientation="vertical" className="h-4" />
                 <span>{product.brand}</span>
            </div>

             {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewsCount} Reviews)</span>
               <a href="#reviews" className="text-sm text-primary hover:underline ml-2">Write a review</a>
            </div>

             {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">${displayPrice.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
              )}
               {product.isOnSale && product.originalPrice && (
                 <Badge variant="destructive" className="text-sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                 </Badge>
               )}
            </div>

             {/* Stock Status */}
            <div className="flex items-center gap-2">
               <CheckCircle className={`h-5 w-5 ${product.stockStatus === 'In Stock' ? 'text-green-600' : product.stockStatus === 'Low Stock' ? 'text-orange-500' : 'text-red-600' }`} />
               <span className={`font-medium ${product.stockStatus === 'In Stock' ? 'text-green-700' : product.stockStatus === 'Low Stock' ? 'text-orange-600' : 'text-red-700' }`}>
                {product.stockStatus}
               </span>
            </div>

            <Separator />

             {/* Variants Selection */}
             <div className="space-y-4">
                {product.variants?.colors && product.variants.colors.length > 0 && (
                    <div className="flex items-center gap-3">
                       <span className="font-medium text-sm w-16">Color:</span>
                       <Select
                         value={selectedColor}
                         onValueChange={setSelectedColor}
                         disabled={product.stockStatus === 'Out of Stock'}
                        >
                         <SelectTrigger className="w-[180px]">
                           <SelectValue placeholder="Select color" />
                         </SelectTrigger>
                         <SelectContent>
                           {product.variants.colors.map(color => (
                             <SelectItem key={color} value={color}>{color}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                    </div>
                )}
                 {product.variants?.sizes && product.variants.sizes.length > 0 && (
                    <div className="flex items-center gap-3">
                       <span className="font-medium text-sm w-16">Size:</span>
                       <Select
                         value={selectedSize}
                         onValueChange={setSelectedSize}
                          disabled={product.stockStatus === 'Out of Stock'}
                       >
                         <SelectTrigger className="w-[180px]">
                           <SelectValue placeholder="Select size" />
                         </SelectTrigger>
                         <SelectContent>
                           {product.variants.sizes.map(size => (
                             <SelectItem key={size} value={size}>{size}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                    </div>
                 )}
                 {/* Quantity Selector */}
                  <div className="flex items-center gap-3">
                     <span className="font-medium text-sm w-16">Quantity:</span>
                      <QuantitySelector
                        quantity={selectedQuantity}
                        onQuantityChange={handleQuantityChange}
                        min={1}
                        // Optionally set max based on stock level if available
                        // max={product.stockQuantity}
                        disabled={product.stockStatus === 'Out of Stock'}
                      />
                  </div>
             </div>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <BuyNowButton
                product={productWithOptions}
                quantity={selectedQuantity}
                size="lg"
                disabled={product.stockStatus === 'Out of Stock'}
              />
              <AddToCartButton
                product={productWithOptions}
                quantity={selectedQuantity}
                size="lg"
                variant="outline"
                disabled={product.stockStatus === 'Out of Stock'}
              />
            </div>
            <div className="pt-2">
               <WishlistButton
                 product={product}
                 size="lg"
                 variant="ghost"
                 className="w-full justify-center text-muted-foreground hover:text-primary hover:bg-accent"
                />
            </div>


             <Separator />

             {/* Short Description / Highlights */}
             <div className="text-sm text-muted-foreground space-y-2">
                <p>{product.description.substring(0, 150)}{product.description.length > 150 ? '...' : ''}</p>
                 <ul className="list-disc list-inside space-y-1">
                    <li><span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Fast Shipping Available</span></li>
                    <li><span className="flex items-center gap-2"><RotateCw className="h-4 w-4 text-primary" /> 30-Day Return Policy</span></li>
                 </ul>
             </div>


          </div>
        </div>

        {/* Description, Reviews, Shipping Tabs/Accordion */}
        <div className="mt-12 md:mt-16">
           {/* Use Tabs on Desktop */}
           <div className="hidden md:block">
               <Tabs defaultValue="description" className="w-full">
                 <TabsList className="grid w-full grid-cols-3 mb-4">
                   <TabsTrigger value="description">Description</TabsTrigger>
                   <TabsTrigger value="reviews" id="reviews-tab">Reviews ({reviews.length})</TabsTrigger>
                   <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                 </TabsList>
                 <TabsContent value="description" className="prose max-w-none dark:prose-invert prose-sm pt-4">
                   <p>{product.description}</p>
                 </TabsContent>
                 <TabsContent value="reviews">
                    <ProductReviews reviews={reviews} productId={product.id} />
                 </TabsContent>
                 <TabsContent value="shipping" className="prose max-w-none dark:prose-invert prose-sm pt-4">
                   <h4>Shipping Information</h4>
                   <ul className='list-disc pl-5'>
                    <li>Standard shipping: 3-5 business days.</li>
                    <li>Expedited shipping: 1-2 business days (available at checkout).</li>
                    <li>We ship to all locations within the country.</li>
                    <li>Tracking information provided via email upon shipment.</li>
                   </ul>
                    <h4 className='mt-4'>Return Policy</h4>
                    <ul className='list-disc pl-5'>
                        <li>Easy 30-day return policy on most items.</li>
                        <li>Items must be in original, unused condition with tags attached.</li>
                        <li>Some exclusions apply (e.g., final sale items).</li>
                        <li>Visit our <Link href="/returns" className="text-primary hover:underline">Returns Center</Link> or contact customer support to initiate a return.</li>
                   </ul>
                 </TabsContent>
               </Tabs>
           </div>
           {/* Use Accordion on Mobile */}
           <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent className="prose max-w-none dark:prose-invert prose-sm">
                       <p>{product.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger id="reviews">Reviews ({reviews.length})</AccordionTrigger>
                    <AccordionContent>
                        <ProductReviews reviews={reviews} productId={product.id} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent className="prose max-w-none dark:prose-invert prose-sm">
                       <h4>Shipping Information</h4>
                         <ul className='list-disc pl-5'>
                            <li>Standard shipping: 3-5 business days.</li>
                            <li>Expedited shipping available.</li>
                         </ul>
                       <h4 className='mt-4'>Return Policy</h4>
                         <ul className='list-disc pl-5'>
                            <li>Easy 30-day return policy.</li>
                            <li>Items must be in original condition.</li>
                         </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-20">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
             <Carousel
                opts={{ align: "start", loop: false }}
                 className="w-full -ml-1"
              >
               <CarouselContent className="-ml-4">
                  {relatedProducts.map((relatedProduct) => (
                    <CarouselItem key={relatedProduct.id} className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                      <ProductCard product={relatedProduct} />
                    </CarouselItem>
                  ))}
               </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
             </Carousel>
          </section>
        )}

        {/* AI Product Suggestions */}
         <section className="mt-16 md:mt-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-primary" />
                AI Recommendations
            </h2>
             {isLoadingAISuggestions ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {[...Array(4)].map((_, i) => (
                          <div key={i} className="space-y-3">
                            <Skeleton className="h-[250px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <Skeleton className="h-9 w-full" />
                        </div>
                      ))}
                  </div>
             ) : aiSuggestedProducts.length > 0 ? (
                <Carousel
                    opts={{ align: "start", loop: false }}
                    className="w-full -ml-1"
                >
                    <CarouselContent className="-ml-4">
                        {aiSuggestedProducts.map((suggestedProduct) => (
                            <CarouselItem key={suggestedProduct.id} className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                                <ProductCard product={suggestedProduct} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                     {aiSuggestedProducts.length > 4 && (
                         <>
                             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                             <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
                         </>
                     )}
                </Carousel>
             ) : (
                <p className="text-muted-foreground">No AI recommendations available for this product yet.</p>
             )}
         </section>

      </main>
      {/* <Footer /> */}
    </>
  );
}
