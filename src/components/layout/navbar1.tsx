"use client";

import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModToggle";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Food World",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Dashboard", url: "/dashboard" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  // Hydration Error ফিক্স করার জন্য এই useEffect মাস্ট
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh(); 
  };

  return (
    <section className={cn("sticky top-0 z-50 bg-background/80 backdrop-blur-md py-4 border-b", className)}>
      <div className="container mx-auto px-6">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
              <span className="text-lg font-bold tracking-tighter">{logo.title}</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-orange-600">
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            
            <Link href="/cart" className="relative group p-2">
              <ShoppingBag className="size-6 transition-colors group-hover:text-orange-600" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white border-2 border-background">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="flex gap-2 ml-2 min-w-[150px] justify-end">
              {/* শুধুমাত্র মাউন্ট হওয়ার পর সেশন চেক হবে */}
              {mounted && (
                <>
                  {session ? (
                    <div className="flex items-center gap-4 animate-in fade-in duration-500">
                      <span className="text-sm font-black uppercase tracking-tighter text-orange-600">
                        Hi, {session.user.name?.split(" ")[0]}
                      </span>
                      <Button 
                        onClick={handleLogout} 
                        variant="destructive" 
                        size="sm" 
                        className="rounded-xl h-9 px-4 font-bold text-[10px] uppercase tracking-widest"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 animate-in fade-in duration-500">
                      <Button asChild variant="outline" size="sm" className="rounded-xl">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild size="sm" className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white border-none px-5 font-bold uppercase text-[10px] tracking-widest">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center justify-between">
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2">
              <ShoppingBag className="size-6" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[8px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left uppercase font-black tracking-tighter">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                   {menu.map((item) => (
                     <Link key={item.title} href={item.url} className="text-xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">
                       {item.title}
                     </Link>
                   ))}
                   
                   <div className="pt-8 mt-4 border-t space-y-4">
                     {mounted && (
                       <>
                         {session ? (
                           <div className="space-y-4">
                              <p className="font-bold text-zinc-500 italic">Logged in as {session.user.name}</p>
                              <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 rounded-2xl h-14 font-bold uppercase tracking-widest">
                                Logout
                              </Button>
                           </div>
                         ) : (
                           <div className="grid grid-cols-2 gap-4">
                              <Button asChild variant="outline" className="rounded-2xl h-14 font-bold uppercase tracking-widest"><Link href="/login">Login</Link></Button>
                              <Button asChild className="rounded-2xl h-14 bg-orange-600 hover:bg-orange-700 font-bold uppercase tracking-widest"><Link href="/register">Sign Up</Link></Button>
                           </div>
                         )}
                       </>
                     )}
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };