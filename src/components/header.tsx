
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
import { useCart } from '@/context/cart-context'; // Import useCart
import { useWishlist } from '@/context/wishlist-context'; // Import useWishlist
import { useAuth } from '@/context/auth-context'; // Import useAuth
import { Badge } from '@/components/ui/badge'; // Import Badge
import { useTheme } from "next-themes"; // Add next-themes

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount } = useCart(); // Get cart count
  const { wishlistCount } = useWishlist(); // Get wishlist count
  const { isLoggedIn, user, logout } = useAuth(); // Get auth state and functions
  const { theme, setTheme } = useTheme(); // Use theme hook

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic or redirect to search page
    console.log('Searching for:', searchTerm);
     if (searchTerm.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const handleLogout = () => {
     logout();
     // Optionally close mobile menu if open
     setIsMobileMenuOpen(false);
  }

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
             <div className="flex justify-between items-center mb-6">
                 <Link href="/" className="text-lg font-semibold text-primary" onClick={() => setIsMobileMenuOpen(false)}>ShopWave</Link>
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                   <X className="h-6 w-6" />
                   <span className="sr-only">Close menu</span>
                 </Button>
             </div>
            <nav className="flex flex-col space-y-4">
              <SheetClose asChild><Link href="/" className="hover:text-primary transition-colors">Home</Link></SheetClose>
              <SheetClose asChild><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></SheetClose>
              {/* <SheetClose asChild><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></SheetClose> */}
              {/* <SheetClose asChild><Link href="/deals" className="hover:text-primary transition-colors">Deals</Link></SheetClose> */}
               <DropdownMenuSeparator />
               {isLoggedIn ? (
                 <>
                  <SheetClose asChild><Link href="/profile" className="hover:text-primary transition-colors">My Account</Link></SheetClose>
                  <SheetClose asChild><Link href="/profile/orders" className="hover:text-primary transition-colors">My Orders</Link></SheetClose>
                  <SheetClose asChild><Link href="/wishlist" className="hover:text-primary transition-colors">Wishlist ({wishlistCount})</Link></SheetClose>
                  <SheetClose asChild><Link href="/cart" className="hover:text-primary transition-colors">Cart ({cartCount})</Link></SheetClose>
                  <Button variant="outline" className="w-full mt-4" onClick={handleLogout}>Logout</Button>
                 </>
               ) : (
                 <>
                   <SheetClose asChild><Link href="/login" className="hover:text-primary transition-colors">Login</Link></SheetClose>
                   <SheetClose asChild><Link href="/register" className="hover:text-primary transition-colors">Register</Link></SheetClose>
                 </>
               )}
            </nav>

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
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Dark Mode Toggle */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>


          <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="relative">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>
           <Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs rounded-full">
                     {cartCount}
                   </Badge>
                )}
              </Link>
           </Button>


           {/* User Profile Dropdown/Link */}
          {isLoggedIn ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {/* In real app use user.avatarUrl */}
                      <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name ?? 'U'}`} alt={user?.name ?? 'User Avatar'} />
                      <AvatarFallback>{user?.name ? user.name[0].toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                   <DropdownMenuLabel>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                   <DropdownMenuItem asChild><Link href="/profile/orders">Orders</Link></DropdownMenuItem>
                   <DropdownMenuItem asChild><Link href="/wishlist">Wishlist</Link></DropdownMenuItem>
                   <DropdownMenuItem asChild><Link href="/cart">Cart</Link></DropdownMenuItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                     Logout
                   </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
           ) : (
             <Button asChild variant="ghost" size="icon" aria-label="Login/Register">
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
             </Button>
           )}
        </div>
      </div>
       {/* Search Bar - Below header on mobile */}
       <div className="md:hidden px-4 pb-3 border-t">
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
