'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, updateItemQuantity, clearCart } from '../../redux/slices/cartSlice'
import { formatPrice } from '@/lib/utils'

export default function CartSheet() {
 
  
    const items = useSelector((state: { cart: { items: any[] } }) => state.cart.items)
    const total = useSelector((state: { cart: { total: number } }) => state.cart.total)

    const dispatch = useDispatch()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <ShoppingCart className="h-6 w-6" />
          {total > 0 && (
            <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-orange-500 text-white text-sm flex items-center justify-center">
              {total}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Giỏ hàng của bạn</SheetTitle>
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => dispatch(clearCart())}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Giỏ hàng trống</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] mt-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>
                      
                      {/* Số lượng */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: (item.quantity || 1) - 1 }))}
                          disabled={item.quantity === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }))}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6">
              <Separator className="mb-4" />
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Phí giao hàng</span>
                  <span>{formatPrice(15000)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(total + 15000)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Đặt hàng ({formatPrice(total + 15000)})
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

