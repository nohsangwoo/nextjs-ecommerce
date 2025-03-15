"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">필터</h3>
        <Button variant="outline" size="sm" className="w-full">
          필터 초기화
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger>카테고리</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="category-men" />
                <Label htmlFor="category-men">남성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-women" />
                <Label htmlFor="category-women">여성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-accessories" />
                <Label htmlFor="category-accessories">액세서리</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category-shoes" />
                <Label htmlFor="category-shoes">신발</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>가격</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span>₩{(priceRange[0] * 1000).toLocaleString()}</span>
                <span>₩{(priceRange[1] * 1000).toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>사이즈</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="size-s" />
                <Label htmlFor="size-s">S</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-m" />
                <Label htmlFor="size-m">M</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-l" />
                <Label htmlFor="size-l">L</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-xl" />
                <Label htmlFor="size-xl">XL</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>색상</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="color-black" />
                <Label htmlFor="color-black">블랙</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-white" />
                <Label htmlFor="color-white">화이트</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-blue" />
                <Label htmlFor="color-blue">블루</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-red" />
                <Label htmlFor="color-red">레드</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

