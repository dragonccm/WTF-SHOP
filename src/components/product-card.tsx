import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  image: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  inStock: boolean
  recommended?: boolean
  sale?: number
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className={viewMode === "list" ? "flex" : ""}>
        <div className={viewMode === "list" ? "w-48 shrink-0" : ""}>
          <div className="relative">
            <div className="relative aspect-square">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            {product.sale && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                {product.sale}% OFF
              </Badge>
            )}
            {product.recommended && (
              <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">RECOMMENDED</Badge>
            )}
          </div>
        </div>

        <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            <Link href={`/product/${product.id}`} className="block font-medium hover:text-blue-600">
              {product.name}
            </Link>

            <div className="flex items-center gap-2">
              {product.oldPrice && <span className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>}
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                In Stock
              </Badge>
            </div>

            {viewMode === "list" && (
              <p className="text-gray-500 mt-2">Product description goes here. This is only visible in list view.</p>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Add to cart</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

