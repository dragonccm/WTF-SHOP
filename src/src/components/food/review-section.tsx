'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
}

// Mock data - in a real app, this would come from an API
const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Nguyễn Văn A',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    rating: 5,
    comment: 'Món ăn rất ngon, phục vụ nhanh và nhiệt tình. Sẽ quay lại lần sau!',
    date: '2023-05-15'
  },
  {
    id: '2',
    user: {
      name: 'Trần Thị B',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    rating: 4,
    comment: 'Đồ ăn ngon, giá cả hợp lý. Chỉ có điều không gian hơi chật.',
    date: '2023-05-10'
  },
  // Add more mock reviews as needed
]

interface ReviewSectionProps {
  itemId: string
}

export default function ReviewSection({ itemId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState(0)

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0) {
      const review: Review = {
        id: Date.now().toString(),
        user: {
          name: 'Bạn',
          avatar: '/placeholder.svg?height=40&width=40'
        },
        rating: newRating,
        comment: newReview,
        date: new Date().toISOString().split('T')[0]
      }
      setReviews([review, ...reviews])
      setNewReview('')
      setNewRating(0)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Đánh giá và bình luận</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= newRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setNewRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Viết đánh giá của bạn..."
          value={newReview}
          onChange={(e:any) => setNewReview(e.target.value)}
        />
        <Button onClick={handleSubmitReview}>Gửi đánh giá</Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar>
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.user.name}</div>
                <div className="text-sm text-muted-foreground">{review.date}</div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

