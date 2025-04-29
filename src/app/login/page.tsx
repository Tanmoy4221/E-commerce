
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call / authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic validation (in real app, check credentials against backend)
    if (email === 'user@example.com' && password === 'password') {
       login(); // Update auth state using context
       toast({
         title: "Login Successful",
         description: "Welcome back!",
       });
       router.push('/profile'); // Redirect to profile or dashboard
    } else {
       toast({
         title: "Login Failed",
         description: "Invalid email or password. (Hint: user@example.com / password)",
         variant: "destructive",
       });
       setIsLoading(false);
    }

    // No need to explicitly set isLoading to false on success because of navigation
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center items-center flex-grow">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Access your ShopWave account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                   <Label htmlFor="password">Password</Label>
                   <Link href="/forgot-password" // Create this page later if needed
                         className="text-sm text-primary hover:underline">
                     Forgot password?
                   </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                   <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                   </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
}
