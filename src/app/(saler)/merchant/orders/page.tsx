"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, Download, Filter, MoreVertical, Printer, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Order {
  id: string
  date: string
  shippingNo: string
  status: "paid" | "waiting" | "delivered" | "unfinished"
  items: {
    image: string
    name: string
    sku: string
    quantity: number
  }[]
  total: number
  autoSms?: boolean
}

const orders: Order[] = [
  {
    id: "2471",
    date: "13 Sep, 2022 at 4:39 PM",
    shippingNo: "61833014105",
    status: "paid",
    items: [
      {
        image: "/placeholder.svg",
        name: "Burberry Beige 38mm Stainless Steel Watch with Smoked Check",
        sku: "li300cab-12",
        quantity: 2,
      },
    ],
    total: 580.99,
  },
  {
    id: "2472",
    date: "14 Sep, 2022 at 8:27 PM",
    shippingNo: "61833014106",
    status: "waiting",
    items: [
      {
        image: "/placeholder.svg",
        name: "Laced shoes on high current",
        sku: "dfr-1685y-1",
        quantity: 1,
      },
    ],
    total: 340.48,
    autoSms: true,
  },
]

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((order) => order.id))
    }
  }

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export All</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Create Order</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-100 p-1 h-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-white rounded px-4 py-2">
            All
            <Badge variant="secondary" className="ml-2 bg-gray-200">
              410
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-white rounded px-4 py-2">
            New
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
              36
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-white rounded px-4 py-2">
            Pending
            <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
              40
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="data-[state=active]:bg-white rounded px-4 py-2">
            Delivered
            <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
              334
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleSelectAll}>
          <Checkbox checked={selectedOrders.length === orders.length} className="h-4 w-4" />
          Select All
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-orange-500 hover:text-orange-600">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-green-500 hover:text-green-600">
          <Check className="h-4 w-4" />
          Update Order
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-500 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={selectedOrders.includes(order.id)}
                onCheckedChange={() => handleSelectOrder(order.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Order #{order.id}</span>
                      <Badge
                        variant="secondary"
                        className={
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "waiting"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {order.status === "paid"
                          ? "Paid"
                          : order.status === "waiting"
                            ? "Waiting payment"
                            : order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{order.date}</span>
                      <span>Shipping No: {order.shippingNo}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold">${order.total}</div>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <div className="text-sm text-gray-500">
                        <span>SKU: {item.sku}</span>
                        <span className="mx-2">•</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <span className="mr-2">{order.status === "unfinished" ? "Unfinished" : "Delivered"}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Unfinished</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {order.autoSms && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Auto-SMS
                  </Badge>
                )}

                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

