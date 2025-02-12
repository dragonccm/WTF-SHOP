"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Plus,
    Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
interface CartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    serves?: number;
  }
export default function Cart_session() {
      const [cartItems, setCartItems] = useState<CartItem[]>([
        {
          id: "1",
          name: "Ultimate Loaded Nacho Fiesta",
          description: "Hot Nacho Chips",
          price: 20,
          quantity: 1,
          serves: 1,
        },
        {
          id: "2",
          name: "Smoked Salmon Bagel",
          description: "Smoked Biscuit",
          price: 40,
          quantity: 2,
          serves: 2,
        },
        {
          id: "3",
          name: "Cranberry Club Sandwich",
          description: "Vegetables",
          price: 50,
          quantity: 3,
          serves: 3,
          },
        
      ]);
      const router = useRouter();

      const updateQuantity = (id: string, change: number) => {
        setCartItems((items) =>
          items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          )
        );
      };
    
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discount = subtotal * 0.1;
      const total = subtotal - discount;
  return (
    <div className="bg-cate shadow-md p-6 col-span-2 relative">
    <div className="sticky top-20">
    <h2 className="text-xl font-semibold mb-6">Cart Items</h2>
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500 font-normal text-sm">{item.description}</p>
            {item.serves && (
              <p className="text-sm font-normal  text-gray-500">
                • Serve {item.serves}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="font-medium mb-2 text-orange-500">${item.price}</div>
            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => updateQuantity(item.id, -1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-4 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => updateQuantity(item.id, 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="border-t pt-4 space-y-2">
        <h3 className="font-semibold mb-4">Bill Details</h3>
        <div className="flex justify-between">
          <span className="text-gray-600">Sub Total</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Charge (2 kms)</span>
          <span className="text-orange-500">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount (10%)</span>
          <span>${discount}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>To Pay</span>
          <span className="text-orange-500">${total}</span>
        </div>
      </div>

      <Button
        // onClick={() => router.push("/order/payment")}
        disabled={usePathname() !== '/order/payment'}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
        CHECKOUT
      </Button>
    </div>
    </div>
  </div>
  )
}
