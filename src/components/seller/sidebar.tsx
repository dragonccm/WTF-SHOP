"use client"

import { Menu, ShoppingBag, Utensils,Inbox } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "../../components/ui/button"


interface NavItem {
  icon: React.ReactNode
  href: string
  label: string
}

const navItems: NavItem[] = [
  {
    icon: <Utensils className="h-5 w-5" />,
    href: "/menu",
    label: "menu",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    href: "/order",
    label: "order",
  },
  {
    icon: <Inbox className="h-5 w-5" />,
    href: "/mail",
    label: "mail",
  },
  {
    icon: <Menu className="h-5 w-5" />,
    href: "/more",
    label: "more",
  },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-36 bg-[#FFE4BA]">
      <div className="flex h-full flex-col items-center justify-start p-3">
        <h2 className="font-extrabold pb-10" >WTF Food</h2>
        <nav className="space-y-6 flex flex-col items-center w-full">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="w-full flex">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-full rounded-lg bg-orange-300 hover:bg-orange-200"
                aria-label={item.label}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

