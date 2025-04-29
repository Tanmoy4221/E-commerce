
"use client";

import { useEffect, useState } from 'react'; // Keep useState for isLoading
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header'; // Header might be redundant if layout includes it
import { Footer } from '@/components/footer'; // Footer might be redundant if layout includes it

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state for auth check

   useEffect(() => {
     if (isLoggedIn === false) {
       router.push('/login?redirect=/profile');
     } else if (isLoggedIn === true) {
        setIsLoading(false);
     }
   }, [isLoggedIn, router]);

   if (isLoading) {
      return (
          <div className="flex justify-center items-center flex-grow p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      )
   }

   // User data should be available if loading is false and logged in
   if (!user) {
     console.error("User data missing in profile page after auth check.");
     router.push('/login?redirect=/profile'); // Redirect if user data is somehow still missing
     return null;
   }

  return (
    // Removed Header and Footer as they might be part of the main layout now
    // The container/padding is handled by SidebarInset or parent layout
    <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Account Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Welcome/User Info Card */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Welcome, {user.name}!</CardTitle>
                    <CardDescription>Here's a quick overview of your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                     {/* Add more user info if available */}
                     <Button variant="outline" size="sm" disabled>Edit Profile (Coming Soon)</Button>
                </CardContent>
            </Card>

             {/* Quick Actions Card */}
            <Card className="shadow-sm">
                 <CardHeader>
                     <CardTitle>Quick Actions</CardTitle>
                     <CardDescription>Manage your orders and preferences.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-3">
                     <Button variant="secondary" className="w-full justify-start" asChild>
                         <Link href="/profile/orders">View Order History</Link>
                     </Button>
                      <Button variant="secondary" className="w-full justify-start" asChild>
                         <Link href="/wishlist">View Wishlist</Link>
                     </Button>
                      <Button variant="secondary" className="w-full justify-start" asChild>
                         <Link href="/profile/settings">Account Settings</Link>
                     </Button>
                 </CardContent>
            </Card>
        </div>

         {/* Recent Orders Section (Optional) */}
        <div className="mt-8">
           <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
           <Card className="shadow-sm">
             <CardContent className="p-6 text-center text-muted-foreground">
                <p>No recent orders found.</p>
                {/* TODO: Fetch and display actual recent orders */}
                <Button variant="link" asChild className="mt-2">
                    <Link href="/profile/orders">View All Orders</Link>
                </Button>
             </CardContent>
           </Card>
        </div>
    </div>
  );
}
