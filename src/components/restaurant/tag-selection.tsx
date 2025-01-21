'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Tag {
  id: string
  name: string
  count?: number
}

interface TagSelectionProps {
  tags: Tag[]
  selectedTag: string
  baseUrl: string
}

export default function TagSelection({ tags, selectedTag, baseUrl }: TagSelectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTagClick = (tagId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tagId === 'all') {
      params.delete('category')
    } else {
      params.set('category', tagId)
    }
    params.delete('page') // Reset to first page when changing category
    router.push(`${baseUrl}?${params.toString()}`)
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-2 p-4">
        <button
          onClick={() => handleTagClick('all')}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            selectedTag === 'all' 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          )}
        >
          Tất cả
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              selectedTag === tag.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {tag.name}
            {tag.count && (
              <span className="ml-1 text-xs">({tag.count})</span>
            )}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

