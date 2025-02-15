import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, Clock, Utensils } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ReviewSection from '@/components/food/review-section'
import RelatedItems from '@/components/food/related-items'
import AddToCartButton from '@/components/food/add-to-cart-button'

// Mock data - in a real app, this would come from an API or database
const foodItem = {
  id: 1,
  name: 'Bún đậu mắm tôm đặc biệt',
  description: 'Bún đậu mắm tôm đặc biệt với đậu hũ chiên giòn, chả cốm, nem chua, và mắm tôm thơm ngon.',
  price: 55000,
  image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png',
  rating: 4.5,
  reviewCount: 128,
  preparationTime: '15 phút',
  category: 'Món chính',
  selectedOptions: [
    {
      name: 'Kích cỡ',
      required: true,
      items: [
        { id: 'size-s', name: 'Nhỏ', price: 0 },
        { id: 'size-m', name: 'Vừa', price: 10000 },
        { id: 'size-l', name: 'Lớn', price: 20000 },
      ]
    },
    {
      name: 'Topping',
      required: false,
      items: [
        { id: 'topping-1', name: 'Thêm đậu', price: 5000 },
        { id: 'topping-2', name: 'Thêm chả', price: 10000 },
        { id: 'topping-3', name: 'Thêm nem', price: 8000 },
      ]
    }
  ]
}

export default function FoodItemPage({ params }: { params: { restaurantId: string, itemId: string } }) {
  // In a real app, you'd fetch the food item data based on the itemId
  // If the item is not found, we show a 404 page
  if (!foodItem) {
    notFound()
  }

  return (
    <div className=" bg-main ">
      <div className='container mx-auto px-4 py-8 mt-16'>
      <div className=" grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={foodItem.image}
              alt={foodItem.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{foodItem.rating}</span>
              <span className="text-muted-foreground">({foodItem.reviewCount} đánh giá)</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>{foodItem.preparationTime}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{foodItem.name}</h1>
            <p className="text-muted-foreground">{foodItem.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl  text-orange-500">{foodItem.price.toLocaleString('vi-VN')}₫</span>
            <Badge variant="secondary" className="text-sm">
              <Utensils className="w-4 h-4 mr-1" />
              {foodItem.category}
            </Badge>
          </div>

          <Separator />

          <AddToCartButton foodItem={foodItem} />
        </div>
      </div>

      <Separator className="my-8" />

      <Suspense fallback={<div>Đang tải đánh giá...</div>}>
        <ReviewSection itemId={foodItem.id.toString()} />
      </Suspense>

      <Separator className="my-8" />

      <Suspense fallback={<div>Đang tải món liên quan...</div>}>
        <RelatedItems categoryId={foodItem.category} currentItemId={foodItem.id.toString()} />
      </Suspense>
      </div>
      </div>
  )
}

