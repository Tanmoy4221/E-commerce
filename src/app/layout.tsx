import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
