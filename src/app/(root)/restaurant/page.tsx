import { Suspense } from 'react'
import TagSelection from '@/components/restaurant/tag-selection'
import DealCard from '@/components/card/Restaurant_card'
import PaginationControls from '@/components/restaurant/pagination'
import { Skeleton } from "@/components/ui/skeleton"

// Sample data
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

// Simulated database data
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
}))

interface DealsPageProps {
  searchParams: {
    category?: string
    page?: string
  }
}

export default function DealsPage({ searchParams }: DealsPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const category = searchParams.category || 'all'
  const itemsPerPage = 12
  
  // Filter deals by category
  const filteredDeals = category === 'all' 
    ? allDeals 
    : allDeals.filter(deal => deal.category === category)

  // Calculate pagination
  const totalItems = filteredDeals.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Ưu đãi</h1>
      
      <TagSelection 
        tags={tags} 
        selectedTag={category}
        baseUrl="/restaurant"
      />

      <Suspense fallback={<DealsGridSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
          {currentDeals.map((deal) => (
            <DealCard
              key={deal.id}
              {...deal}
            />
          ))}
        </div>
      </Suspense>

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        baseUrl="/restaurant"
      />
    </div>
  )
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
  )
}

