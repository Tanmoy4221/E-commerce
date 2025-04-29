
"use client"; // Required for SidebarProvider and hooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const profileNavItems = [
    { href: "/profile", label: "Account Overview", icon: User },
    { href: "/profile/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/profile/wishlist", label: "My Wishlist", icon: Heart },
    { href: "/profile/settings", label: "Settings", icon: Settings },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // Assume useAuth provides user info and logout

  const isActive = (href: string) => {
      // Exact match for base profile page, startsWith for subpages
      return href === "/profile" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <SidebarProvider defaultOpen={true} collapsible="icon">
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
            <SidebarHeader className="items-center">
                {/* <SidebarTrigger className="md:hidden" /> Mobile trigger if needed */}
                <Avatar className="size-10 my-2 group-data-[collapsible=icon]:size-8 transition-all">
                  <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name ?? 'U'}`} alt={user?.name ?? 'User'} />
                   <AvatarFallback className="group-data-[collapsible=icon]:hidden">{user?.name ? user.name[0].toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-center group-data-[collapsible=icon]:hidden">
                    <p className="font-semibold text-sm">{user?.name ?? 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {profileNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton
                                    asChild // Important for Link integration
                                    isActive={isActive(item.href)}
                                    tooltip={item.label} // Show label as tooltip when collapsed
                                >
                                    <a> {/* Link content must be wrapped in <a> for legacyBehavior */}
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </a>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} tooltip="Logout">
                           <LogOut />
                           <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
           {/* Main content area for profile pages */}
           {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
