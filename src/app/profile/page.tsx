
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
   const [isLoading, setIsLoading] = React.useState(true); // Add loading state

   useEffect(() => {
     // Check auth status after initial render
     if (isLoggedIn === false) { // Check for explicit false after context initializes
       router.push('/login');
     } else if (isLoggedIn === true) {
        setIsLoading(false); // Stop loading if logged in
     }
     // If isLoggedIn is undefined (initial state), do nothing yet, wait for context
   }, [isLoggedIn, router]);

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

   // Should only reach here if loading is false and isLoggedIn is true
  if (!user) {
     // This case might happen briefly or if context fails, handle gracefully
     console.error("User data not available despite being logged in.");
     router.push('/login'); // Redirect back if user data is missing
     return null; // Avoid rendering anything further
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex-grow">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2">
                 <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                 <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Account Information</h3>
                {/* Placeholder for more user details */}
                <p className="text-sm text-muted-foreground">Manage your profile settings here.</p>
                 <Button variant="outline" size="sm" disabled>Edit Profile (Coming Soon)</Button>
              </div>
               <div className="space-y-2">
                 <h3 className="font-semibold">Order History</h3>
                 <p className="text-sm text-muted-foreground">View your past orders.</p>
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/profile/orders">View Orders</Link>
                  </Button>
               </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Wishlist</h3>
                  <p className="text-sm text-muted-foreground">See items you've saved.</p>
                   <Button variant="outline" size="sm" asChild>
                      <Link href="/wishlist">View Wishlist</Link>
                   </Button>
                </div>
                 <div className="space-y-2 pt-4 border-t">
                   <Button variant="destructive" onClick={logout} className="w-full sm:w-auto">
                      Logout
                   </Button>
                 </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
