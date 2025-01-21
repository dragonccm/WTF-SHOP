'use client'

import { useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  id: number
  name: string
  description: string
}

interface CategorySidebarProps {
  categories: Category[]
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  const categoryRefs = useRef<{ [key: number]: HTMLElement | null }>({})

  useEffect(() => {
    categories.forEach(category => {
      categoryRefs.current[category.id] = document.getElementById(`category-${category.id}`)
    })
  }, [categories])

const scrollToCategory = (categoryId: number) => {
    const element = categoryRefs.current[categoryId]
    if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
}

  return (
    <ScrollArea className="h-[calc(100vh-200px)] ">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Danh mục món ăn</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => scrollToCategory(category.id)}
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-muted-foreground">
                {category.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

