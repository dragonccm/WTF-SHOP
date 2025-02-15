"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { Button } from "@/components/ui/button";
interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategorySidebarProps {
  categories: Category[];
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  const categoryRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  const [inStockOnly, setInStockOnly] = useState(true);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    categories.forEach((category) => {
      categoryRefs.current[category.id] = document.getElementById(
        `category-${category.id}`
      );
    });
  }, [categories]);

  const scrollToCategory = (categoryId: number) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-100px)] ">
      <div className="p-4 bg-sidebar rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Danh mục món ăn</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray hover:border-orange-500 border border-transparent transition-colors"
              onClick={() => scrollToCategory(category.id)}>
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-muted-foreground">
                {category.description}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 bg-sidebar rounded-lg shadow-md mt-4">
        {/* Price Filter */}
        <div>
          <h2 className="font-semibold mb-4">FILTER BY PRICE</h2>
          <DualRangeSlider
            defaultValue={[0, 30]}
            max={30}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>
              Price: ${priceRange[0]} — ${priceRange[1]}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Apply filter
              }}>
              Filter
            </Button>
          </div>
        </div>

        {/* Product Status */}
        <div className="mt-8 ">
          <h2 className="font-semibold mb-4">PRODUCT STATUS</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <Checkbox className="checkbox_main"
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(!!checked)}
              />
              <span>In Stock</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <Checkbox className="checkbox_main"
                checked={onSaleOnly}
                onCheckedChange={(checked) => setOnSaleOnly(!!checked)}
              />
              <span>On Sale</span>
            </label>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
