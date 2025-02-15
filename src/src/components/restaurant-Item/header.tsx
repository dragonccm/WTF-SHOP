"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Clock, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantHeaderProps {
  restaurant: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    distance: string;
    address: string;
    categories: string[];
    openTime: string;
    closeTime: string;
    priceRange: string;
    description: string;
  };
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  // State để kiểm soát header sticky
  const [isSticky, setIsSticky] = useState(false);

  // Effect để theo dõi scroll và toggle header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header chính với ảnh cover */}
      <div className="relative h-[400px]">
        {/* Ảnh cover */}
       
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Thông tin nhà hàng */}
        <div className="absolute bottom-0 left-0 right-0 text-white p-6 mx-24">
          <div className="container flex items-center gap-20">
            <Image
              src={
                "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png"
              }
              width={300}
              height={300}
              alt={restaurant.name}
              className="object-cover w-[500px]"
            />
            <div className=" mx-auto">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-gray-200 mb-4">{restaurant.description}</p>

              {/* Thông tin cơ bản */}
              <div className="flex flex-wrap gap-4 items-center text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{restaurant.rating}</span>
                  <span>({restaurant.reviews}+ đánh giá)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {restaurant.openTime} - {restaurant.closeTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>Liên hệ đặt bàn</span>
                </div>
              </div>

              {/* Địa chỉ và khoảng giá */}
              <div className="flex flex-wrap gap-4 items-center text-sm mb-4">
                <div>{restaurant.address}</div>
                <div>|</div>
                <div>{restaurant.priceRange}</div>
              </div>

              {/* Danh mục */}
              <div className="flex gap-2">
                {restaurant.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header sticky khi scroll */}
      <div
        className={`fixed top-[0px] left-0 right-0 bg-gray shadow-md z-50 transform transition-transform duration-300 ${
          isSticky ? "translate-y-0 top-[63px]" : "-translate-y-full"
        }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h2 className="font-semibold truncate">{restaurant.name}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
            <div>{restaurant.distance}</div>
          </div>
        </div>
      </div>
    </>
  );
}
