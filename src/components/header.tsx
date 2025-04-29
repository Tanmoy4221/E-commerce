"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
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
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useAuth } from '@/context/auth-context';
import { Badge } from '@/components/ui/badge';
import { useTheme } from "next-themes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { categories, products } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the search input


  const [suggestions, setSuggestions] = useState<any[]>([]); // Use 'any' or define a type for suggestions
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
      const fetchSuggestions = async () => {
          if (!searchTerm) {
              setSuggestions([]);
              return;
          }

          setIsLoading(true);
          // Simulate fetching suggestions from an API or data source
          await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay

          // Filter products and categories based on search term
          const productSuggestions = products
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => ({ id: p.id, label: p.name, type: 'product', slug: p.slug }));

          const categorySuggestions = categories
              .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(c => ({ id: c.id, label: c.name, type: 'category', slug: c.slug }));

          const combinedSuggestions = [...productSuggestions, ...categorySuggestions];
          setSuggestions(combinedSuggestions);
          setIsLoading(false);
      };

      fetchSuggestions();
  }, [searchTerm]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
     if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setOpenSearch(false); // Close the search popover after submitting
    }
  };

  const handleLogout = () => {
     logout();
     setIsMobileMenuOpen(false);
  }

  const handleSuggestionClick = (suggestion: any) => {
    setSearchTerm(''); // Clear the search term
    setSuggestions([]); // Clear the suggestions
    setOpenSearch(false); // Close the popover
    if (suggestion.type === 'product') {
      router.push(`/product/${suggestion.slug}`);
    } else if (suggestion.type === 'category') {
      router.push(`/shop?category=${suggestion.slug}`);
    }
  };


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
           <Popover open={openSearch} onOpenChange={setOpenSearch}>
             <PopoverTrigger asChild>
                 <form onSubmit={handleSearch} className="w-full relative">
                   <Input
                     type="search"
                     placeholder="Search products..."
                     className="w-full pr-10"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     ref={searchInputRef}
                   />
                   <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                     <Search className="h-4 w-4 text-muted-foreground" />
                     <span className="sr-only">Search</span>
                   </Button>
                 </form>
               </PopoverTrigger>
               <PopoverContent className="w-[400px] p-0 outline-none" align="start" side="bottom">
                 <Command>
                   <CommandInput placeholder="Search products..."  value={searchTerm} onValueChange={setSearchTerm} />
                   <CommandList>
                     <CommandEmpty>
                       {isLoading ? (
                         <div className="py-6 flex items-center justify-center">
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                         </div>
                       ) : "No results found."}
                     </CommandEmpty>
                     {suggestions.length > 0 && (
                       <CommandGroup heading="Suggestions">
                         {suggestions.map((suggestion) => (
                           <CommandItem key={suggestion.id} onSelect={() => handleSuggestionClick(suggestion)}>
                             {suggestion.label}
                           </CommandItem>
                         ))}
                       </CommandGroup>
                     )}
                   </CommandList>
                 </Command>
               </PopoverContent>
             </Popover>
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
           <Popover open={openSearch} onOpenChange={setOpenSearch}>
             <PopoverTrigger asChild>
               <form onSubmit={handleSearch} className="w-full relative">
                 <Input
                   type="search"
                   placeholder="Search products..."
                   className="w-full pr-10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   ref={searchInputRef}
                 />
                 <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                   <Search className="h-4 w-4 text-muted-foreground" />
                   <span className="sr-only">Search</span>
                 </Button>
               </form>
             </PopoverTrigger>
             <PopoverContent className="w-[calc(100vw-32px)] p-0 outline-none" align="start" side="bottom">
               <Command>
                 <CommandInput placeholder="Search products..." value={searchTerm} onValueChange={setSearchTerm} />
                 <CommandList>
                   <CommandEmpty>
                     {isLoading ? (
                       <div className="py-6 flex items-center justify-center">
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                       </div>
                     ) : "No results found."}
                   </CommandEmpty>
                   {suggestions.length > 0 && (
                     <CommandGroup heading="Suggestions">
                       {suggestions.map((suggestion) => (
                         <CommandItem key={suggestion.id} onSelect={() => handleSuggestionClick(suggestion)}>
                           {suggestion.label}
                         </CommandItem>
                       ))}
                     </CommandGroup>
                   )}
                 </CommandList>
               </Command>
             </PopoverContent>
           </Popover>
         </div>
    </header>
  );
}

