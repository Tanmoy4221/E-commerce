
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';


export default function CheckoutPage() {
  const { isLoggedIn } = useAuth();
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Auth loading state
  const [isProcessingOrder, setIsProcessingOrder] = useState(false); // Order processing state
  const { toast } = useToast();

  // --- Form State ---
  // Shipping Address
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  // Payment Info
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');


  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/login?redirect=/checkout'); // Redirect to login if not authenticated
    } else if (isLoggedIn === true) {
       if (cartCount === 0) {
           toast({ title: "Cart is empty", description: "Add items to your cart before proceeding to checkout.", variant: "destructive" });
           router.push('/shop'); // Redirect to shop if cart is empty
       } else {
          setIsLoading(false); // Stop loading only if logged in and cart has items
       }
    }
    // If isLoggedIn is undefined, wait for context
  }, [isLoggedIn, router, cartCount, toast]);


  const handlePlaceOrder = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessingOrder(true);

      // --- Validation (Basic Example) ---
      if (!shippingName || !shippingAddress || !shippingCity || !shippingState || !shippingZip ||
          !cardName || !cardNumber || !cardExpiry || !cardCVC) {
          toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
          setIsProcessingOrder(false);
          return;
      }

      // --- Simulate Order Processing ---
      console.log("Processing order...", {
          shipping: { name: shippingName, address: shippingAddress, city: shippingCity, state: shippingState, zip: shippingZip },
          payment: { cardName, cardNumber: '**** **** **** ' + cardNumber.slice(-4), cardExpiry, cardCVC: '***' },
          items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
          total: cartTotal,
      });

      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // --- Order Success ---
      toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. Your order is being processed.",
      });
      clearCart(); // Empty the cart
      router.push('/profile/orders'); // Redirect to orders page

      // setIsProcessingOrder(false); // Not needed due to navigation
  }


   if (isLoading) {
      return (
          <>
             <Header />
             <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center items-center flex-grow">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </main>
             <Footer />
          </>
      )
   }

   // Should only reach here if loading is false, isLoggedIn is true, and cart is not empty

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
        <Button variant="outline" size="sm" className="mb-6" asChild>
          <Link href="/cart"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart</Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="shipping-name">Full Name</Label>
                  <Input id="shipping-name" placeholder="John Doe" value={shippingName} onChange={(e) => setShippingName(e.target.value)} required disabled={isProcessingOrder} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="shipping-address">Street Address</Label>
                  <Input id="shipping-address" placeholder="123 Main St" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required disabled={isProcessingOrder} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping-city">City</Label>
                  <Input id="shipping-city" placeholder="Anytown" value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} required disabled={isProcessingOrder} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="shipping-state">State / Province</Label>
                   {/* In a real app, use a Select with state options */}
                   <Input id="shipping-state" placeholder="CA" value={shippingState} onChange={(e) => setShippingState(e.target.value)} required disabled={isProcessingOrder} />
                 </div>
                 <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="shipping-zip">ZIP / Postal Code</Label>
                    <Input id="shipping-zip" placeholder="90210" value={shippingZip} onChange={(e) => setShippingZip(e.target.value)} required disabled={isProcessingOrder} />
                 </div>
              </CardContent>
            </Card>

             {/* Payment Information */}
             <Card>
               <CardHeader>
                 <CardTitle>Payment Information</CardTitle>
                 <CardDescription className="text-xs flex items-center text-green-600 dark:text-green-400">
                    <Lock className="mr-1 h-3 w-3" /> Secure Checkout
                 </CardDescription>
               </CardHeader>
               <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John M Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} required disabled={isProcessingOrder} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                     <Label htmlFor="card-number">Card Number</Label>
                     {/* Add input masking for card number in a real app */}
                     <Input id="card-number" placeholder="•••• •••• •••• ••••" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required disabled={isProcessingOrder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiry Date (MM/YY)</Label>
                    <Input id="card-expiry" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required disabled={isProcessingOrder} />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="card-cvc">CVC</Label>
                     <Input id="card-cvc" placeholder="123" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} required disabled={isProcessingOrder} />
                  </div>
               </CardContent>
             </Card>
          </div>

           {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
             <Card className="sticky top-24 shadow-md">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                   <CardDescription>{cartCount} item(s)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Accordion type="single" collapsible className="w-full">
                     <AccordionItem value="item-1">
                       <AccordionTrigger className="text-sm font-medium py-2">View Items</AccordionTrigger>
                       <AccordionContent>
                          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 text-sm">
                             {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center gap-2">
                                    <div className='flex items-center gap-2'>
                                        <Image src={item.images[0]} alt={item.name} width={40} height={40} className="rounded border object-cover" />
                                        <div className='flex-grow'>
                                            <p className='line-clamp-1 font-medium'>{item.name}</p>
                                            <p className='text-xs text-muted-foreground'>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className='font-medium'>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                             ))}
                          </div>
                       </AccordionContent>
                     </AccordionItem>
                   </Accordion>

                   <Separator />

                  <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                     <span>Shipping</span>
                     <span className="font-medium">FREE</span> {/* Example */}
                  </div>
                   <div className="flex justify-between text-muted-foreground">
                     <span>Taxes</span>
                     <span className="font-medium">$0.00</span> {/* Example: Calculate later */}
                   </div>
                   <Separator />
                   <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                   </div>
                </CardContent>
                 <CardFooter>
                    <Button type="submit" size="lg" className="w-full" disabled={isProcessingOrder}>
                        {isProcessingOrder ? (
                             <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                             </>
                        ) : (
                             <>
                                <Lock className="mr-2 h-4 w-4" /> Place Secure Order
                             </>
                        )}
                    </Button>
                 </CardFooter>
             </Card>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
