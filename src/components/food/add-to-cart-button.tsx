"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FoodItemOption {
  name: string;
  required: boolean;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  selectedOptions?: FoodItemOption[];
}

interface SelectedItem {
  options: Record<string, any>;
}

interface AddToCartButtonProps {
  foodItem: FoodItem;
}

export default function AddToCartButton({ foodItem }: AddToCartButtonProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([
    { options: {} },
  ]);

  const handleOptionChange = (
    itemIndex: number,
    optionName: string,
    value: string | string[]
  ) => {
    setSelectedItems((prev) => {
      const newItems = [...prev];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        options: {
          ...newItems[itemIndex].options,
          [optionName]: value,
        },
      };
      return newItems;
    });
  };

  const calculateItemPrice = (item: SelectedItem) => {
    let total = foodItem.price;
    Object.entries(item.options).forEach(([optionName, selectedValue]) => {
      const option = foodItem.selectedOptions?.find(
        (opt) => opt.name === optionName
      );
      if (option) {
        if (Array.isArray(selectedValue)) {
          selectedValue.forEach((value) => {
            const item = option.items.find((item) => item.id === value);
            if (item) total += item.price;
          });
        } else {
          const item = option.items.find((item) => item.id === selectedValue);
          if (item) total += item.price;
        }
      }
    });
    return total;
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      ...foodItem,
      selectedItems,
      totalPrice: calculateTotalPrice(),
    });
  };

  const addItem = () => {
    setSelectedItems((prev) => [...prev, { options: {} }]);
  };

  const removeItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] pr-4">
        {selectedItems.map((item, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Món {index + 1}</h3>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {foodItem.selectedOptions?.map((option) => (
              <div key={option.name} className="space-y-2 mt-2">
                <h4 className="font-medium">{option.name}</h4>
                {option.required ? (
                <RadioGroup
                className=""
                onValueChange={(value) =>
                  handleOptionChange(index, option.name, value)
                }
                defaultValue={option.items[0].id}>
                {option.items.map((optionItem) => (
                  <div
                    key={optionItem.id}
                    className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={optionItem.id}
                      id={`${index}-${optionItem.id}`}
                      className="radio_main">
                      
                    </RadioGroupItem>
                    <Label
                      htmlFor={`${index}-${optionItem.id}`}
                      className="text-black-500">
                      {optionItem.name} (+
                      {optionItem.price.toLocaleString("vi-VN")}₫)
                    </Label>
                  </div>
                ))}
              </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    {option.items.map((optionItem) => (
                      <div
                        key={optionItem.id}
                        className="flex items-center space-x-2 ">
                        <Checkbox
                          id={`${index}-${optionItem.id}`}
                          className="checkbox_main"
                          onCheckedChange={(checked) => {
                            const currentSelected =
                              item.options[option.name] || [];
                            if (checked) {
                              handleOptionChange(index, option.name, [
                                ...currentSelected,
                                optionItem.id,
                              ]);
                            } else {
                              handleOptionChange(
                                index,
                                option.name,
                                currentSelected.filter(
                                  (id: string) => id !== optionItem.id
                                )
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`${index}-${optionItem.id}`}>
                          {optionItem.name} (+
                          {optionItem.price.toLocaleString("vi-VN")}₫)
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-2 text-right">
              <span className="font-medium">
                Giá: {calculateItemPrice(item).toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>
        ))}
      </ScrollArea>
      <Button onClick={addItem} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Thêm món
      </Button>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">Tổng cộng:</span>
        <span className="text-lg font-bold text-orange-500">
          {calculateTotalPrice().toLocaleString("vi-VN")}₫
        </span>
      </div>
      <Button onClick={handleAddToCart} className="w-full btn_main">
        Thêm vào giỏ hàng ({selectedItems.length})
      </Button>
    </div>
  );
}
