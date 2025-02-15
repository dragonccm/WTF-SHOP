"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { addItem } from "../../redux/slices/cartSlice";
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
export default function Food_card_grid(item: MenuItem) {
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {}
  );
  const [showPlusButton, setShowPlusButton] = useState(false);

  // Tính giá cuối cùng dựa trên options được chọn
  const calculateFinalPrice = (item: MenuItem) => {
    let total = item.price;
    console.log(item);

    if (item.options) {
      Object.entries(selectedOptions).forEach(([optionName, selected]) => {
        const option = item.options?.find((opt) => opt.name === optionName);
        if (option) {
          if (Array.isArray(selected)) {
            // Checkbox group
            selected.forEach((id) => {
              const optionItem = option.items.find((item) => item.id === id);
              if (optionItem) total += optionItem.price;
            });
          } else {
            // Radio group
            const optionItem = option.items.find(
              (item) => item.id === selected
            );
            if (optionItem) total += optionItem.price;
          }
        }
      });
    }

    return total;
  };
  return (
    <Dialog key={item.id}>
      <div className="">
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardHeader className="p-0">
            <div className="relative aspect-square"  onMouseEnter={() =>
                  setShowPlusButton(true)
                }
                onMouseLeave={() =>
                  setShowPlusButton(false)
                }>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-t-lg"
               
              />
              {showPlusButton && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-90">
                  <div>
                    <DialogTrigger className="p-2 w-[30px] h-[30px] flex justify-items-center items-center bg-orange-600 hover:opacity-80">
                      <Plus className="h-6 w-6 text-white" />
                    </DialogTrigger>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">
              <Link href={`/restaurant/menu/${item.id}`} key={item.id}>
                {item.name}
              </Link>
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-medium text-orange-600">
                {item.price.toLocaleString("vi-VN")}₫
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm">{"item.rating"}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  ({"item.reviewCount"})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hình ảnh món ăn */}
          <div className="relative h-48 w-full">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Mô tả */}
          <p className="text-muted-foreground">{item.description}</p>

          {/* Options */}
          {item.options?.map((option: any) => (
            <div key={option.name} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{option.name}</h4>
                {option.required && (
                  <span className="text-sm text-red-500">*Bắt buộc</span>
                )}
              </div>

              {option.required ? (
                // Radio group cho required options
                <RadioGroup
                  onValueChange={(value) =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.name]: parseInt(value),
                    }))
                  }>
                  {option.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={item.id.toString()}
                        id={`${option.name}-${item.id}`}
                      />
                      <Label htmlFor={`${option.name}-${item.id}`}>
                        {item.name}
                        {item.price > 0 && ` (+${formatPrice(item.price)})`}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                // Checkbox group cho optional options
                <div className="space-y-2">
                  {option.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${option.name}-${item.id}`}
                        onCheckedChange={(checked) => {
                          setSelectedOptions((prev) => {
                            const current = prev[option.name] || [];
                            return {
                              ...prev,
                              [option.name]: checked
                                ? [...current, item.id]
                                : current.filter(
                                    (id: number) => id !== item.id
                                  ),
                            };
                          });
                        }}
                      />
                      <Label htmlFor={`${option.name}-${item.id}`}>
                        {item.name}
                        {item.price > 0 && ` (+${formatPrice(item.price)})`}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Tổng tiền và nút thêm vào giỏ */}
          <div className="flex items-center justify-between pt-4">
            <div className="font-medium">
              Tổng cộng: {formatPrice(calculateFinalPrice(item))}
            </div>
            <Button
              onClick={() => {
                dispatch(
                  addItem({
                    ...item,
                    price: calculateFinalPrice(item),
                    selectedOptions,
                  })
                );
                setSelectedOptions({});
              }}>
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}