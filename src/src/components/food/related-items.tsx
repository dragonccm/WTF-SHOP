'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'

interface RelatedItem {
  id: string
  name: string
  image: string
  price: number
  rating: number
  reviewCount: number
}

// Mock data - in a real app, this would come from an API
const mockRelatedItems: RelatedItem[] = [
  {
    id: '2',
    name: 'Bún chả Hà Nội',
    image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png',
    price: 45000,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Phở bò tái lăn',
    image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png',
    price: 50000,
    rating: 4.8,
    reviewCount: 120
  },
  {
    id: '4',
    name: 'Bánh mì thịt nướng',
    image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-14.png',
    price: 25000,
    rating: 4.6,
    reviewCount: 75
  },
  {
    id: '4',
    name: 'Bánh mì thịt nướng',
    image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-14.png',
    price: 25000,
    rating: 4.6,
    reviewCount: 75
  },
  {
    id: '4',
    name: 'Bánh mì thịt nướng',
    image: 'https://angular.pixelstrap.net/zomo/assets/images/product/vp-14.png',
    price: 25000,
    rating: 4.6,
    reviewCount: 75
  },
]

interface RelatedItemsProps {
  categoryId: string
  currentItemId: string
}

export default function RelatedItems({ categoryId, currentItemId }: RelatedItemsProps) {
  // In a real app, you'd fetch related items based on the category and exclude the current item
  const relatedItems = mockRelatedItems.filter(item => item.id !== currentItemId)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Món ăn liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {relatedItems.map((item) => (
          <Link href={`/restaurant/menu/${item.id}`} key={item.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-600" >{item.price.toLocaleString('vi-VN')}₫</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({item.reviewCount})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

