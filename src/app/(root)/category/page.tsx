"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import RestaurantCard from "@/components/card/Restaurant_card";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControls from "@/components/restaurant/pagination";
import DealCard from "@/components/card/Restaurant_card";
import TagSelection from "@/components/restaurant/tag-selection";

const allDeals = Array.from({ length: 50 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Nhà hàng mẫu ${index + 1}`,
  image: "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
  cuisineTypes: ["Món Việt Nam", "Đồ ăn"],
  rating: parseFloat((Math.random() * 5).toFixed(1)),
  location: "123 Đường mẫu, Ninh Kiều",
  distance: `${(Math.random() * 5).toFixed(1)} km`,
  estimatedTime: `${Math.floor(Math.random() * 30)} phút`,
  promotion: {
    title: "Giảm 30k cho đơn từ 150k",
    discount: "Giảm 30k"
  },
  category: "food"
}));

const categories = [
  { id: "shrimp", name: "Shrimp", count: 5 },
  { id: "sliced-deli-meat", name: "Sliced Deli Meat", count: 6 },
  { id: "wild-caught-fillets", name: "Wild Caught Fillets", count: 4 },
  { id: "beef", name: "Beef", count: 8 },
  { id: "breakfast-sausage", name: "Breakfast Sausage", count: 3 },
  { id: "chicken", name: "Chicken", count: 12 },
  { id: "crab-shellfish", name: "Crab and Shellfish", count: 7 },
  { id: "dinner-sausage", name: "Dinner Sausage", count: 5 },
  { id: "farm-raised-fillets", name: "Farm Raised Fillets", count: 6 },
];

interface DealsPageProps {
  searchParams: {
    category?: string;
    page?: string;
  };
}
const tags = [
  { id: 'food', name: 'Đồ ăn', count: 142 },
  { id: 'drink', name: 'Đồ uống', count: 56 },
  { id: 'vegetarian', name: 'Đồ chay', count: 28 },
  { id: 'dessert', name: 'Tráng miệng', count: 35 },
  { id: 'convenience', name: 'Tiện lợi', count: 15 },
  { id: 'pharmacy', name: 'Nhà thuốc', count: 8 },
  { id: 'flowers', name: 'Hoa', count: 12 },
  { id: 'pets', name: 'Thú cưng', count: 5 },
]
export default function CategoryPage({ searchParams }: DealsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const category = searchParams.category || "all";
  const itemsPerPage = 12;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter deals by category
  const filteredDeals =
    category === "all"
      ? allDeals
      : allDeals.filter((deal) => deal.category === category);

  // Calculate pagination
  const totalItems = filteredDeals.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDeals = filteredDeals.slice(startIndex, endIndex);

  return (
    <div className="bg-gray">
      <div className="container mx-auto px-4 py-8 mt-16 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-8 ">
            {/* Categories */}
            {/* <div className="bg-sidebar p-4 shadow">
              <h2 className="font-semibold mb-4">PRODUCT CATEGORIES</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-2 text-sm">
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category.id,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter(
                              (id) => id !== category.id
                            )
                          );
                        }
                      }}
                    />
                    <span className="flex-1">{category.name}</span>
                    <span className="text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div> */}
            <TagSelection 
                    tags={tags} 
                    selectedTag={category}
                    baseUrl="/category"
                  />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-sidebar shadow flex justify-end items-center mb-4 pt-4">
              <ToggleGroup type="single" defaultValue="bold">
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  aria-checked="true"
                  className="toggle_home text-lg text-gray-500 font-sans">
                  Fast Delivery
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  className="toggle_home text-lg text-gray-500 font-sans">
                  Rating
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                  className="toggle_home text-lg text-gray-500 font-sans">
                  Cost
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

           
            <Suspense fallback={<DealsGridSkeleton />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
                {currentDeals.map((deal) => (
                  <DealCard key={deal.id} {...deal} />
                ))}
              </div>
            </Suspense>
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
              baseUrl="/category"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DealsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}