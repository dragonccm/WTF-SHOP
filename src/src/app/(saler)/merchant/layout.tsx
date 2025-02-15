"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ChefHat,
  ClipboardList,
  Home,
  LayoutGrid,
  LogOut,
  Settings,
  Store,
  Users,
} from "lucide-react"
import "@/app/globals.css";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Tổng quan",
    href: "/merchant",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Đơn hàng",
    href: "/merchant/orders",
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    title: "Thực đơn",
    href: "/merchant/menu",
    icon: <ChefHat className="w-5 h-5" />,
  },
  {
    title: "Danh mục",
    href: "/merchant/categories",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    title: "Thống kê",
    href: "/merchant/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Đặt bàn",
    href: "/merchant/reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Nhân viên",
    href: "/merchant/staff",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Cài đặt",
    href: "/merchant/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export default function RestaurantAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <html lang='en'>
      <body>
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Nav */}
      <div className="lg:hidden border-b bg-[#1a1f37] px-4 py-3">
        <div className="flex items-center justify-between text-white">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Store className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Quản lý cửa hàng</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white",
                        pathname === item.href ? "bg-orange-500/10 text-white" : "",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <span className="font-semibold text-white">Nhà hàng của tôi</span>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex h-screen w-64 flex-col fixed left-0 border-r bg-cate">
          <div className="p-6 py-10">
            <h2 className="text-2xl font-semibold text-1">Quản lý cửa hàng</h2>
          </div>
          <div className="flex-1 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-2 transition-all hover:text-orange-500 hover:bg-orange-500/10",
                    pathname === item.href ? "bg-orange-500 text-white" : "",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full bg-orange-500 text-another" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">{children}</main>
      </div>
        </div>
        </body>
      </html>
  )
}

