
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (!isNaN(newQuantity)) {
        updateQuantity(productId, Math.max(0, newQuantity)); // Prevent negative numbers
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartCount === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-card">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items - Left/Main Column */}
            <div className="lg:col-span-2 space-y-6">
               <ScrollArea className="h-[50vh] lg:h-auto lg:max-h-[60vh] pr-4 -mr-4"> {/* Add ScrollArea */}
                 {cartItems.map((item) => (
                    <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 mb-4 shadow-sm overflow-hidden">
                     <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative rounded overflow-hidden border">
                        <Image
                         src={item.images[0]}
                         alt={item.name}
                         fill
                         sizes="(max-width: 640px) 100px, 120px"
                         className="object-cover"
                       />
                     </div>

                      <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                          <div className="flex-grow mb-2 sm:mb-0 mr-4">
                           <Link href={`/product/${item.slug}`} className="text-lg font-medium hover:text-primary line-clamp-2">
                             {item.name}
                           </Link>
                           <p className="text-sm text-muted-foreground">{item.brand} / {item.category}</p>
                           {/* Display selected variants if they exist */}
                            {item.variants?.colors && <p className="text-xs text-muted-foreground">Color: {item.variants.colors[0]}</p>}
                            {item.variants?.sizes && <p className="text-xs text-muted-foreground">Size: {item.variants.sizes[0]}</p>}
                            <p className="sm:hidden text-lg font-semibold text-primary mt-1">${(item.price * item.quantity).toFixed(2)}</p> {/* Price on mobile */}
                         </div>

                         <div className="flex items-center gap-4 sm:gap-6">
                             {/* Quantity Control */}
                             <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                 <Input
                                     type="number"
                                     value={item.quantity}
                                     onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                     min="1"
                                     className="h-8 w-12 text-center border-0 border-l border-r rounded-none focus-visible:ring-0"
                                     aria-label={`${item.name} quantity`}
                                 />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                             </div>

                             {/* Price (Desktop) */}
                             <p className="hidden sm:block text-lg font-semibold text-primary w-24 text-right">
                               ${(item.price * item.quantity).toFixed(2)}
                             </p>

                             {/* Remove Button */}
                             <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive h-8 w-8"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.name} from cart`}
                             >
                               <X className="h-5 w-5" />
                             </Button>
                         </div>
                      </div>
                    </Card>
                 ))}
               </ScrollArea> {/* End ScrollArea */}
                <div className="flex justify-end mt-4">
                   <Button variant="outline" onClick={clearCart} className="text-destructive hover:bg-destructive/10 border-destructive/50">
                      Clear Cart
                   </Button>
                </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-md"> {/* Make summary sticky */}
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button size="lg" className="w-full" asChild>
                      {/* Link to checkout page (create later) */}
                     <Link href="/checkout">
                         Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
                   <Button variant="outline" className="w-full" asChild>
                      <Link href="/shop">Continue Shopping</Link>
                   </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
