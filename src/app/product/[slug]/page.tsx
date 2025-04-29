
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, CheckCircle, Truck, RotateCw } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getReviewsForProduct, Product, Review } from '@/lib/data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductImageGallery } from '@/components/product-image-gallery'; // Create this component
import { AddToCartButton } from '@/components/add-to-cart-button'; // Create this component
import { WishlistButton } from '@/components/wishlist-button'; // Create this component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For variants

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Optional: Generate static paths for better performance
// export async function generateStaticParams() {
//   const products = await getAllProducts(); // Assuming you have a function to get all products
//   return products.map((product) => ({
//     slug: product.slug,
//   }));
// }

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound(); // Show 404 if product not found
  }

  const relatedProducts = getRelatedProducts(product);
  const reviews = getReviewsForProduct(product.id);

  const displayPrice = product.isOnSale ? product.price : product.price;
  const originalPrice = product.isOnSale ? product.originalPrice : null;

  return (
    <>
      <Header />
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
              {/* Link to reviews tab */}
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

             {/* Variants (if applicable) */}
             <div className="space-y-4">
                {product.variants?.colors && product.variants.colors.length > 0 && (
                    <div className="flex items-center gap-3">
                       <span className="font-medium text-sm w-16">Color:</span>
                       <Select defaultValue={product.variants.colors[0]}>
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
                       <Select defaultValue={product.variants.sizes[0]}>
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
             </div>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <AddToCartButton product={product} />
               <WishlistButton product={product} />
            </div>

             <Separator />

             {/* Short Description / Highlights */}
             <div className="text-sm text-muted-foreground space-y-2">
                <p>{product.description.substring(0, 150)}{product.description.length > 150 ? '...' : ''}</p>
                {/* Add some key features if available */}
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
                 <TabsContent value="description" className="prose max-w-none dark:prose-invert prose-sm">
                   <p>{product.description}</p>
                   {/* Add more detailed description, specs etc. */}
                 </TabsContent>
                 <TabsContent value="reviews">
                    <ProductReviews reviews={reviews} productId={product.id} />
                 </TabsContent>
                 <TabsContent value="shipping" className="prose max-w-none dark:prose-invert prose-sm">
                   <h4>Shipping Information</h4>
                   <p>Standard shipping typically takes 3-5 business days. Expedited options available at checkout.</p>
                   <p>We ship to all locations within the country.</p>
                    <h4>Return Policy</h4>
                    <p>We offer a 30-day return policy on most items. Items must be in original condition with tags attached.</p>
                    <p>To initiate a return, please visit our returns center or contact customer support.</p>
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
                       <p>Standard shipping typically takes 3-5 business days. Expedited options available at checkout.</p>
                       <h4>Return Policy</h4>
                       <p>We offer a 30-day return policy on most items. Items must be in original condition.</p>
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
                opts={{
                  align: "start",
                  loop: true,
                }}
                 className="w-full"
              >
               <CarouselContent className="-ml-4">
                  {relatedProducts.map((relatedProduct) => (
                    <CarouselItem key={relatedProduct.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <ProductCard product={relatedProduct} />
                    </CarouselItem>
                  ))}
               </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
             </Carousel>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}


// --- Sub Components ---

// Component to display reviews (can be moved to its own file)
function ProductReviews({ reviews, productId }: { reviews: Review[], productId: string }) {
    if (reviews.length === 0) {
        return <p className="text-muted-foreground py-4">No reviews yet. Be the first to review!</p>;
    }
    return (
        <div className="space-y-6 pt-4">
            {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-1">
                       <div className="flex items-center gap-2">
                           <span className="font-semibold">{review.userName}</span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
                                ))}
                           </div>
                       </div>
                        <span className="text-xs text-muted-foreground">{review.date.toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                </div>
            ))}
             {/* Add Review Form (Placeholder) */}
             <div className="pt-4">
                <h4 className="font-semibold mb-2">Write Your Review</h4>
                {/* Add form fields here later */}
                 <Button>Submit Review</Button>
             </div>
        </div>
    );
}
