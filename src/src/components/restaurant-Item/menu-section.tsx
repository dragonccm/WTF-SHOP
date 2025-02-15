"use client";
import FoodCard from "../card/food_card";
import Food_card_grid from "../card/food_card_grid";

interface MenuItemOption {
  name: string;
  required: boolean;
  items: {
    id: number;
    name: string;
    price: number;
  }[];
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  options?: MenuItemOption[];
}

interface MenuSectionProps {
  category: {
    id: number;
    name: string;
    description: string;
  };
  items: MenuItem[];
  viewMode: "grid" | "list";
}

export default function MenuSection({ category, items,viewMode }: MenuSectionProps) {
  return (
    <section id={`category-${category.id}`} className="mb-8 bg-sidebar rounded-lg shadow-md p-4">
      <h2 className="text-sm text-gray-500 mb-2 ">{category.name}</h2>
      {/* <p className="text-muted-foreground mb-4">{category.description}</p> */}

    {items.length === 0 ? (
      <p>Chưa có sản phẩm</p>
    ) : (
      <div className={viewMode === 'list' ?"grid grid-cols-1 md:grid-cols-1 gap-4":"grid grid-cols-3 md:grid-cols-3 gap-4"} >
        {items.map((item) => (
          viewMode === 'list' ? <FoodCard key={item.id} {...item} />
            : 
            
              <Food_card_grid key={item.id} {...item} />
          
        ))}
      </div>
    )}
    </section>
  );
}
