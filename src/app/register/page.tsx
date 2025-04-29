
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Header and Footer are now handled by RootLayout
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Assume registration is successful for this demo
    toast({
      title: "Registration Successful",
      description: "Your account has been created. Please login.",
    });

    // Redirect to login page after successful mock registration
    router.push('/login');

    // No need to set isLoading to false due to navigation
  };

  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center items-center flex-grow">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join ShopWave today!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="name">Full Name</Label>
                 <Input
                   id="name"
                   type="text"
                   placeholder="Your Name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                   disabled={isLoading}
                 />
               </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                 <Label htmlFor="password">Password</Label>
                 <Input
                   id="password"
                   type="password"
                   placeholder="••••••••"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   minLength={6} // Basic password requirement example
                   disabled={isLoading}
                 />
              </div>
               <div className="space-y-2">
                 <Label htmlFor="confirm-password">Confirm Password</Label>
                 <Input
                   id="confirm-password"
                   type="password"
                   placeholder="••••••••"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   required
                   disabled={isLoading}
                 />
               </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading ? (
                    <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
                    </>
                 ) : (
                   'Register'
                 )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Login
                </Link>
              </p>
          </CardFooter>
        </Card>
      </main>
      {/* <Footer /> */}
    </>
  );
}
