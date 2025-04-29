
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package } from 'lucide-react';
import { Loader2 } from 'lucide-react';


// Mock order data (keep consistent with order detail page mock)
const mockOrders = [
  { id: 'ORD12345', date: '2024-07-15', total: 145.50, status: 'Shipped', items: 1 }, // Corrected item count
  { id: 'ORD67890', date: '2024-07-10', total: 89.99, status: 'Processing', items: 1 },
  { id: 'ORD11223', date: '2024-06-28', total: 215.00, status: 'Delivered', items: 5 },
  { id: 'ORD44556', date: '2024-06-12', total: 35.75, status: 'Delivered', items: 1 },
];

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/login?redirect=/profile/orders');
    } else if (isLoggedIn === true) {
       setIsLoading(false); // Stop loading once logged in status confirmed
    }
    // If isLoggedIn is undefined, wait for context to initialize
  }, [isLoggedIn, router]);


   if (isLoading) {
      return (
          <div className="flex justify-center items-center flex-grow p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      )
   }

  return (
    <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>

        <Card className="shadow-sm">
          {/* Removed CardHeader and Description as title is handled by h1 */}
          <CardContent className="p-0 md:p-6"> {/* Adjust padding for responsiveness */}
            {mockOrders.length === 0 ? (
               <div className="text-center py-12 px-6">
                 <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                 <p className="text-lg text-muted-foreground">You haven't placed any orders yet.</p>
                 <Button asChild className="mt-4">
                   <Link href="/shop">Start Shopping</Link>
                 </Button>
               </div>
            ) : (
               <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
                   <Table>
                     <TableHeader>
                       <TableRow>
                         <TableHead className="w-[100px]">Order ID</TableHead>
                         <TableHead>Date</TableHead>
                         <TableHead>Status</TableHead>
                         <TableHead className="hidden sm:table-cell">Items</TableHead> {/* Hide items on smaller screens */}
                         <TableHead className="text-right">Total</TableHead>
                         <TableHead className="w-[100px] text-right">Actions</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {mockOrders.map((order) => (
                         <TableRow key={order.id}>
                           <TableCell className="font-medium">{order.id}</TableCell>
                           <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                           <TableCell>
                             <Badge variant={
                                 order.status === 'Shipped' ? 'default' :
                                 order.status === 'Processing' ? 'secondary' :
                                 order.status === 'Delivered' ? 'outline'
                                 : 'secondary'
                             } className={order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700' : ''}>
                               {order.status}
                             </Badge>
                           </TableCell>
                            <TableCell className="hidden sm:table-cell">{order.items}</TableCell>
                           <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                           <TableCell className="text-right">
                             <Button variant="link" size="sm" className="h-auto p-0" asChild>
                                <Link href={`/profile/orders/${order.id}`}>View</Link>
                             </Button>
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
               </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
