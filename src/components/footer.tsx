
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto border-t">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div>
             <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary mb-2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary">
                 <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3.32 6.176A3 3 0 0 0 1.5 8.948v6.104a3 3 0 0 0 1.82 2.772l8.302 4.526a.75.75 0 0 0 .756 0l8.302-4.526A3 3 0 0 0 22.5 15.052V8.948a3 3 0 0 0-1.82-2.772L12.378 1.602ZM12 15.952l-4.361-2.372 4.06-2.208 4.72 2.568-4.419 2.012Zm0-5.154-4.72-2.568 4.419-2.012 4.361 2.372-4.06 2.208Z" />
               </svg>
              <span>ShopWave</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your destination for the latest trends in fashion, electronics, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link href="/profile/orders" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold mb-3">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter for updates and offers.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1 bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
             <div className="flex space-x-3 mt-4">
               <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
               <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
               <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
               <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></Link>
             </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShopWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
