
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Package, Home, Phone } from 'lucide-react';

// Mock Order Detail Data Structure
interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
  slug: string; // For linking back to product
}

interface OrderDetails {
  id: string;
  date: string;
  total: number;
  status: 'Shipped' | 'Processing' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string; // e.g., 'Visa ending in 1234'
}

// Mock function to fetch order details
const fetchOrderDetails = async (orderId: string): Promise<OrderDetails | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find the order from the mock list (use the same mock data as orders page for consistency)
   const mockOrdersBase = [
     { id: 'ORD12345', date: '2024-07-15', total: 145.50, status: 'Shipped', items: 3 },
     { id: 'ORD67890', date: '2024-07-10', total: 89.99, status: 'Processing', items: 1 },
     { id: 'ORD11223', date: '2024-06-28', total: 215.00, status: 'Delivered', items: 5 },
     { id: 'ORD44556', date: '2024-06-12', total: 35.75, status: 'Delivered', items: 1 },
   ];

   const baseOrder = mockOrdersBase.find(o => o.id === orderId);

   if (!baseOrder) {
     return null;
   }

   // Create detailed mock items based on the base order (example)
    let items: OrderItem[] = [];
    if (orderId === 'ORD12345') {
        items = [
            { id: 'prod1', name: 'Wireless Noise-Cancelling Headphones', imageUrl: 'https://picsum.photos/seed/headphones1/100/100', quantity: 1, price: 145.50, slug: 'wireless-noise-cancelling-headphones' },
            // Add more items if baseOrder.items > 1
        ];
    } else if (orderId === 'ORD67890') {
        items = [
            { id: 'prod8', name: 'Unisex Canvas Sneakers', imageUrl: 'https://picsum.photos/seed/sneaker1/100/100', quantity: 1, price: 89.99, slug: 'unisex-canvas-sneakers' },
        ];
    } else { // Default for other orders
        items = Array.from({ length: baseOrder.items }, (_, i) => ({
            id: `mockProd${i+1}`,
            name: `Sample Product ${i+1}`,
            imageUrl: `https://picsum.photos/seed/sample${i+1}/100/100`,
            quantity: 1,
            price: baseOrder.total / baseOrder.items,
            slug: `sample-product-${i+1}` // Placeholder slug
        }));
    }


  // Return detailed mock order
  return {
    ...baseOrder,
    status: baseOrder.status as 'Shipped' | 'Processing' | 'Delivered' | 'Cancelled', // Type assertion
    items: items,
    shippingAddress: {
      name: 'Demo User',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '90210',
    },
    paymentMethod: 'Visa ending in 1234',
  };
};


export default function OrderDetailPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/login');
    } else if (isLoggedIn === true && orderId) {
      const loadOrder = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const details = await fetchOrderDetails(orderId);
          if (details) {
            setOrderDetails(details);
          } else {
             setError("Order not found.");
          }
        } catch (err) {
           console.error("Error fetching order details:", err);
           setError("Failed to load order details.");
        } finally {
           setIsLoading(false);
        }
      };
      loadOrder();
    }
    // Handle case where isLoggedIn is initially undefined
  }, [isLoggedIn, orderId, router]);

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

   if (error) {
      return (
          <>
             <Header />
             <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center text-center flex-grow">
                 <p className="text-destructive text-xl mb-4">{error}</p>
                 <Button variant="outline" asChild>
                    <Link href="/profile/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders</Link>
                 </Button>
             </main>
             <Footer />
          </>
      )
   }

    if (!orderDetails) {
        // Should ideally be covered by error state, but good fallback
         return (
             <>
             <Header />
             <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center text-center flex-grow">
                 <p className="text-muted-foreground text-xl mb-4">Could not load order details.</p>
                  <Button variant="outline" asChild>
                      <Link href="/profile/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders</Link>
                  </Button>
             </main>
             <Footer />
             </>
         )
    }

  // --- Render Order Details ---
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders</Link>
          </Button>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <CardTitle className="text-2xl">Order Details</CardTitle>
                    <CardDescription>Order ID: {orderDetails.id}</CardDescription>
                </div>
                <div className="text-sm text-muted-foreground text-left sm:text-right">
                    <p>Placed on: {new Date(orderDetails.date).toLocaleDateString()}</p>
                     <p>Total: <span className="font-semibold text-foreground">${orderDetails.total.toFixed(2)}</span></p>
                </div>
            </div>
             <Separator className="mt-4"/>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Status */}
                  <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Status</h4>
                      <Badge variant={
                             orderDetails.status === 'Shipped' ? 'default' :
                             orderDetails.status === 'Processing' ? 'secondary' :
                             orderDetails.status === 'Delivered' ? 'outline' // Example: green for delivered
                             : 'destructive' // Example: red for cancelled
                         } className={orderDetails.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700' : orderDetails.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700' : ''}>
                           {orderDetails.status}
                      </Badge>
                      {/* Add tracking link if shipped */}
                      {orderDetails.status === 'Shipped' && <Button variant="link" size="sm" className="p-0 h-auto text-xs" disabled>Track Shipment (mock)</Button>}
                  </div>
                   {/* Shipping Address */}
                  <div className="space-y-1">
                      <h4 className="font-semibold text-sm flex items-center gap-1"><Home className='w-4 h-4'/> Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">{orderDetails.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.shippingAddress.address}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}</p>
                  </div>
                   {/* Payment Method */}
                   <div className="space-y-1">
                       <h4 className="font-semibold text-sm">Payment Method</h4>
                       <p className="text-sm text-muted-foreground">{orderDetails.paymentMethod}</p>
                   </div>
              </div>
          </CardContent>
        </Card>

         {/* Items in Order */}
         <Card className="shadow-lg">
             <CardHeader>
                <CardTitle>Items Ordered ({orderDetails.items.length})</CardTitle>
             </CardHeader>
             <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] hidden sm:table-cell"></TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="hidden sm:table-cell">
                           <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded border object-cover" />
                        </TableCell>
                        <TableCell>
                           <Link href={`/product/${item.slug}`} className="font-medium hover:text-primary line-clamp-2">{item.name}</Link>
                           {/* Display variants if available */}
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <Separator className="my-4"/>
                 <div className="flex justify-end">
                     <div className="w-full max-w-xs space-y-2 text-sm">
                         <div className="flex justify-between">
                             <span>Subtotal</span>
                             <span>${orderDetails.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                         </div>
                          <div className="flex justify-between text-muted-foreground">
                             <span>Shipping</span>
                             <span>$0.00</span> {/* Example */}
                         </div>
                         <div className="flex justify-between text-muted-foreground">
                             <span>Taxes</span>
                             <span>$0.00</span> {/* Example */}
                         </div>
                         <Separator/>
                          <div className="flex justify-between font-bold text-base">
                             <span>Total</span>
                             <span>${orderDetails.total.toFixed(2)}</span>
                         </div>
                     </div>
                 </div>
             </CardContent>
              <CardFooter className="flex justify-end gap-2">
                 <Button variant="outline" disabled>Reorder (mock)</Button>
                 <Button variant="outline" disabled>Request Return (mock)</Button>
              </CardFooter>
         </Card>

      </main>
      <Footer />
    </>
  );
}

