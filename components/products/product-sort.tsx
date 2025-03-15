"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductSort() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">120개 상품</p>
      <Select defaultValue="newest">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">최신순</SelectItem>
          <SelectItem value="price-asc">가격 낮은순</SelectItem>
          <SelectItem value="price-desc">가격 높은순</SelectItem>
          <SelectItem value="popular">인기순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

