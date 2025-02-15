"use client";

import { useState } from "react";
// Trang chính hiển thị chi tiết nhà hàng
import RestaurantHeader from "@/components/restaurant-Item/header";
import MenuSection from "@/components/restaurant-Item/menu-section";
import CartSheet from "@/components/restaurant-Item/cart-sheet";
import CategorySidebar from "@/components/restaurant-Item/category-sidebar";
import Image from "next/image";
import VoucherList from "@/components/voucher-list";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Grid, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

// Dữ liệu mẫu của nhà hàng
const restaurantData = {
  name: "Bún Đậu Mắm Tôm Cô Hương - Bánh Bạch Tuộc Và Bánh Cá",
  rating: 4.5,
  reviews: 999,
  image: "/placeholder.svg?height=400&width=1200",
  distance: "0.9km",
  address: "123 Nguyễn Văn Linh, Ninh Kiều, Cần Thơ",
  categories: ["Bún đậu", "Đồ ăn vặt", "Món Việt Nam"],
  openTime: "09:00",
  closeTime: "21:00",
  priceRange: "15,000đ - 50,000đ",
  description:
    "Quán chuyên các món bún đậu mắm tôm và đồ ăn vặt. Không gian thoáng mát, sạch sẽ.",
};

// Danh sách danh mục món ăn
const menuCategories = [
  {
    id: 1,
    name: "Bún đậu mắm tôm",
    description: "Các set bún đậu mắm tôm đầy đủ",
  },
  {
    id: 2,
    name: "Bánh bạch tuộc",
    description: "Bánh bạch tuộc kiểu Nhật",
  },
  {
    id: 3,
    name: "Bánh cá",
    description: "Các loại bánh cá",
  },
  {
    id: 4,
    name: "Đồ uống",
    description: "Nước ngọt, trà đá",
  },
];

// Danh sách món ăn
const menuItems = [
  {
    id: 1,
    categoryId: 1,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 1,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 1,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 3,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 3,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 3,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 2,
    categoryId: 2,
    name: "Bánh bạch tuộc takoyaki",
    price: 35000,
    image: "https://angular.pixelstrap.net/zomo/assets/images/product/vp-9.png",
    description: "6 viên bánh bạch tuộc",
    options: [
      {
        name: "Topping",
        required: false,
        items: [
          { id: 1, name: "Thêm sốt", price: 5000 },
          { id: 2, name: "Thêm rong biển", price: 5000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 2,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 4,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 4,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryId: 4,
    name: "Bún đậu mắm tôm đặc biệt",
    price: 45000,
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    description: "Bún, đậu hũ chiên, chả cốm, nem chua, mắm tôm",
    options: [
      {
        name: "Size",
        required: true,
        items: [
          { id: 1, name: "Nhỏ", price: 0 },
          { id: 2, name: "Vừa", price: 10000 },
          { id: 3, name: "Lớn", price: 20000 },
        ],
      },
    ],
  },
];

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  return (
    <main className="min-h-screen bg-gray">
      {/* Header với ảnh cover và thông tin nhà hàng */}
      <RestaurantHeader restaurant={restaurantData} />

      <div className="  box-bg ">
        <div className="container mx-auto px-4 py-12 flex gap-6">
          {/* Sidebar danh mục - Ẩn trên mobile */}
          <div className="hidden lg:block w-64 basis-1/5">
            <div className="sticky top-20">
              <CategorySidebar categories={menuCategories} />
            </div>
          </div>

          {/* Danh sách món ăn */}
          <div className="basis-3/5">
            {/* Toolbar */}
            <div className="bg-sidebar flex flex-wrap items-center justify-between gap-4 mb-2  bg-white p-2 rounded-lg">
              <div className="flex items-center gap-4">
              <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-gray-100 hover:text-black",
                    viewMode === "list" && "bg-gray border border-orange-500"
                  )}
                  onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-gray-100 hover:text-black",
                    viewMode === "grid" && "bg-gray border border-orange-500"
                  )}
                  onClick={() => setViewMode("grid")}>
                  <Grid className="h-4 w-4" />
                </Button>
              
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="latest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Sort by latest</SelectItem>
                    <SelectItem value="popularity">
                      Sort by popularity
                    </SelectItem>
                    <SelectItem value="rating">Sort by rating</SelectItem>
                    <SelectItem value="price-low">
                      Sort by price: low to high
                    </SelectItem>
                    <SelectItem value="price-high">
                      Sort by price: high to low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="link"
                className="text-blue-600 h-auto p-0"
                onClick={() => {
                  // Clear all filters
                }}>
                Clear filters
              </Button>
              <span>•</span>
              <span className="text-sm text-gray-500">In Stock</span>
              <span>•</span>
              <span className="text-sm text-gray-500">Max $30.00</span>
            </div>
            {menuCategories.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                items={menuItems.filter(
                  (item) => item.categoryId === category.id
                )}
                viewMode={viewMode}
              />
            ))}
          </div>
          <div className="basis-1/5">
            <div className="px-2 py-4 bg-orange-500 flex items-center flex-col justify-center rounded-md text-white">
              <Image
                src="/images/QR.png"
                alt="QR image"
                width={200}
                height={200}
                className="object-cover"
              />
              <span className="mt-4">Quét mã để đặt món trên app nhá!</span>
            </div>
            {/* Danh sách voucher */}
            <VoucherList />
          </div>
        </div>
      </div>

      {/* Giỏ hàng */}
      <CartSheet />
    </main>
  );
}
