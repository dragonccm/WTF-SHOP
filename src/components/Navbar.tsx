"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { ShoppingCart, User, Menu } from "lucide-react";
import { Menu, MapPin, User, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";



const Map = dynamic(() => import("@/components/home/map"), {
  ssr: false,
});
interface User {
  name: string;
  email: string;
  image: string;
}
export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user) {
      setUserData(session.user as User);
      setIsLogin(true);
    }
  }, [sessionStatus, session]);
  const [cartCount, setCartCount] = useState(3);
  const categories = [
    {
      name: "Pizza",
      subcategories: ["Italian Pizza", "American Pizza", "Mexican Pizza"],
      featured: [
        {
          name: "Margherita Special",
          description: "Fresh tomatoes, mozzarella, basil",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
        {
          name: "Pepperoni Feast",
          description: "Double pepperoni, extra cheese",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
      ],
    },
    {
      name: "Burgers",
      subcategories: ["Beef Burgers", "Chicken Burgers", "Veggie Burgers"],
      featured: [
        {
          name: "Classic Cheeseburger",
          description: "100% Angus beef with cheddar",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
        {
          name: "Crispy Chicken Deluxe",
          description: "Crispy chicken with special sauce",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
      ],
    },
    {
      name: "Asian",
      subcategories: ["Chinese", "Japanese", "Thai", "Vietnamese"],
      featured: [
        {
          name: "Sushi Combo",
          description: "Fresh selection of sushi rolls",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
        {
          name: "Pad Thai",
          description: "Traditional Thai noodles",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
      ],
    },
    {
      name: "Desserts",
      subcategories: ["Cakes", "Ice Cream", "Cookies", "Pastries"],
      featured: [
        {
          name: "Chocolate Cake",
          description: "Rich chocolate layer cake",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
        {
          name: "Ice Cream Sundae",
          description: "Vanilla ice cream with toppings",
          image:
            "https://angular.pixelstrap.net/zomo/assets/images/product/vp-3.png",
        },
      ],
    },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-[#232220]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link href="/" className="text-2xl font-bold text-white font-serif">
              WTF Food
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn_main ml-4 py-4 ">
                  <MapPin className="mr-1 h-12 w-4" />
                  Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Location</DialogTitle>
                  <DialogDescription>
                   Bạn muốn giao đến đâu?
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <div className="mb-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input id="link" defaultValue="" placeholder="Nhập địa chỉ giao hàng" />
                  </div>
                  <Collapsible>
                    <CollapsibleTrigger className="text-orange-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="mr-1 h-12 w-4" />
                       Tìm trên bản đồ
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="h-[400px] w-[400px]">
                        <Map />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="hidden  md:flex items-center gap-8">
            <Link href="/" className="white_text hover:text-orange-500">
              Home
            </Link>


            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="relative text-white text-base hover_none bg-transparent">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-4 w-[800px] gap-0">
                        {categories.map((category) => (
                          <div
                            key={category.name}
                            className="p-4 hover:bg-muted/50">
                            <Link
                              href={`/category/${category.name.toLowerCase()}`}
                              className="font-medium text-lg mb-2 block hover:text-orange-500">
                              {category.name}
                            </Link>
                            <div className="space-y-2 mb-4">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub}
                                  href={`/category/${category.name.toLowerCase()}/${sub
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                                  className="block text-sm text-muted-foreground hover:text-orange-500">
                                  {sub}
                                </Link>
                              ))}
                            </div>
                            <div className="space-y-3 pt-3 border-t">
                              {category.featured.map((item) => (
                                <Link
                                  key={item.name}
                                  href={`/item/${item.name
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                                  className="flex items-center gap-3 group">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                  />
                                  <div>
                                    <p className="text-sm font-medium group-hover:text-orange-500">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Link
              href="/restaurant"
              className="white_text hover:text-orange-500">
              Restaurants
            </Link>
            <Link href="/about" className="white_text hover:text-orange-500">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover_none">
                  <ShoppingCart className="icon_base" />
                  {cartCount > 0 && (
                    <div className="absolute top-[0px] -right-2 h-4 w-4 flex items-center justify-center bg-orange-500 text-white rounded-full text-xs">
                      {cartCount}
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold leading-none">Shopping Cart</h4>
                    <Badge variant="secondary" className="text-white">
                      {cartCount} items
                    </Badge>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md" />
                      <div className="grid gap-1">
                        <h5 className="text-sm font-bold">Margherita Pizza</h5>
                        <p className="text-sm text-muted-foreground">$12.99</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-md" />
                      <div className="grid gap-1">
                        <h5 className="text-sm font-bold">Chicken Burger</h5>
                        <p className="text-sm text-muted-foreground">$8.99</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">Total</p>
                    <p className="text-xl font-medium text-orange-500">
                      $21.98
                    </p>
                  </div>
                  <Button className="w-full btn_main font-bold">
                    View Cart
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {isLogin && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover_none">
                    <User className="h-5 w-5 text-white icon_base" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-50">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={userData?.image} />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{`Hi, ${userData?.name}`}</p>
                      <p className="text-xs text-muted-foreground">My Account</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="w-full justify-start hover:text-orange-500">
                      <Link href="/profile">Profile</Link>
                    </div>
                    <div className="w-full justify-start hover:text-orange-500">
                      <Link href="/orders">My orders</Link>
                    </div>
                    <div className="w-full justify-start hover:text-orange-500">
                      <Link href="/addresses">Saved Address</Link>
                    </div>

                    <div className="w-full justify-start hover:text-orange-500">
                      <Link href="/settings">Settings</Link>
                    </div>
                    <Separator />
                    <div className="w-full justify-start hover:text-orange-600 " onClick={() => signOut()}>
                      Logout
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <ThemeToggle />
            {!isLogin &&
              <>
                <Button
                  variant="outline"
                  className="justify-self-end px-2 py-1 text-xs">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button className="justify-self-end px-2 py-1 text-xs">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            }

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex white_text flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    className="white_text text-white hover:text-orange-500">
                    Home
                  </Link>
                  <Link
                    href="/restaurants"
                    className="white_text hover:text-orange-500">
                    Restaurants
                  </Link>
                  <Link
                    href="/about"
                    className="white_text hover:text-orange-500">
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="white_text hover:text-orange-500">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
