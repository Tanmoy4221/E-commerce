
import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { AuthProvider } from '@/context/auth-context'; // Import AuthProvider
import { ThemeProvider } from "@/context/theme-provider"; // Import ThemeProvider
import { Header } from '@/components/header'; // Import Header
import { Footer } from '@/components/footer'; // Import Footer

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Define font variable

export const metadata: Metadata = {
  title: 'ShopWave - Modern E-commerce',
  description: 'A modern e-commerce experience built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply the font variable */}
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
         <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
         >
           <AuthProvider> {/* Wrap with AuthProvider */}
             <WishlistProvider>
              <CartProvider>
                  <Header /> {/* Add Header here */}
                  {children}
                  <Footer /> {/* Add Footer here */}
                  <Toaster />
              </CartProvider>
             </WishlistProvider>
           </AuthProvider>
         </ThemeProvider>
      </body>
    </html>
  );
}
