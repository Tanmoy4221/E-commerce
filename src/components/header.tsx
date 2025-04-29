
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useTheme } from "next-themes"; // Add next-themes if needed for dark mode

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const { theme, setTheme } = useTheme(); // Uncomment for dark mode

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic or redirect to search page
    console.log('Searching for:', searchTerm);
     if (searchTerm.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

   // Mock user state
  const isLoggedIn = false; // Change to true to see logged-in state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
            <nav className="flex flex-col space-y-4">
              <SheetClose asChild>
                <Link href="/" className="text-lg font-semibold text-primary">ShopWave</Link>
              </SheetClose>
              <SheetClose asChild><Link href="/" className="hover:text-primary transition-colors">Home</Link></SheetClose>
              <SheetClose asChild><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></SheetClose>
              <SheetClose asChild><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></SheetClose>
              <SheetClose asChild><Link href="/deals" className="hover:text-primary transition-colors">Deals</Link></SheetClose>
               <DropdownMenuSeparator />
               {isLoggedIn ? (
                 <>
                  <SheetClose asChild><Link href="/profile" className="hover:text-primary transition-colors">My Account</Link></SheetClose>
                  <SheetClose asChild><Link href="/profile/orders" className="hover:text-primary transition-colors">My Orders</Link></SheetClose>
                  <SheetClose asChild><Link href="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link></SheetClose>
                  <Button variant="outline" className="w-full">Logout</Button>
                 </>
               ) : (
                 <>
                   <SheetClose asChild><Link href="/login" className="hover:text-primary transition-colors">Login</Link></SheetClose>
                   <SheetClose asChild><Link href="/register" className="hover:text-primary transition-colors">Register</Link></SheetClose>
                 </>
               )}
            </nav>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
               <span className="sr-only">Close menu</span>
            </Button>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="hidden md:flex items-center space-x-2 text-2xl font-bold text-primary">
           {/* You can replace this SVG with an actual logo */}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
             <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3.32 6.176A3 3 0 0 0 1.5 8.948v6.104a3 3 0 0 0 1.82 2.772l8.302 4.526a.75.75 0 0 0 .756 0l8.302-4.526A3 3 0 0 0 22.5 15.052V8.948a3 3 0 0 0-1.82-2.772L12.378 1.602ZM12 15.952l-4.361-2.372 4.06-2.208 4.72 2.568-4.419 2.012Zm0-5.154-4.72-2.568 4.419-2.012 4.361 2.372-4.06 2.208Z" />
           </svg>
          <span>ShopWave</span>
        </Link>

        {/* Search Bar - Centered on Desktop */}
        <div className="flex-1 hidden md:flex justify-center px-8 lg:px-16">
           <form onSubmit={handleSearch} className="w-full max-w-lg relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Search className="h-4 w-4 text-muted-foreground" />
               <span className="sr-only">Search</span>
            </Button>
            {/* Add live suggestions dropdown here if needed */}
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Dark Mode Toggle - Uncomment if using next-themes */}
          {/*
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          */}

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {/* Optional: Add badge for wishlist count */}
               {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span> */}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {/* Optional: Add badge for cart count */}
              {/* <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span> */}
            </Button>
          </Link>

           {/* User Profile Dropdown/Link */}
          {isLoggedIn ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                   <DropdownMenuItem asChild><Link href="/profile/orders">Orders</Link></DropdownMenuItem>
                   <DropdownMenuItem asChild><Link href="/wishlist">Wishlist</Link></DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
           ) : (
             <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="Login/Register">
                  <User className="h-5 w-5" />
                </Button>
             </Link>
           )}
        </div>
      </div>
       {/* Search Bar - Below header on mobile */}
       <div className="md:hidden px-4 pb-3 border-b">
           <form onSubmit={handleSearch} className="w-full relative">
             <Input
               type="search"
               placeholder="Search products..."
               className="w-full pr-10"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
               <Search className="h-4 w-4 text-muted-foreground" />
               <span className="sr-only">Search</span>
             </Button>
           </form>
         </div>
    </header>
  );
}
