"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { mockProducts } from "@/lib/mock-data"
import { Heart, HeartOff } from "lucide-react"

export function NewArrivals() {
  // 신상품 4개만 표시 (실제로는 다른 데이터를 사용하겠지만 여기서는 모킹)
  const newProducts = [...mockProducts].reverse().slice(0, 4)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    e.stopPropagation()

    const product = mockProducts.find((p) => p.id === productId)
    if (!product) return

    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">신상품</h2>
        <Button asChild variant="outline">
          <Link href="/products?category=new">모두 보기</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
              <Button
                variant={isInWishlist(product.id) ? "destructive" : "secondary"}
                size="icon"
                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                onClick={(e) => toggleWishlist(e, product.id)}
              >
                {isInWishlist(product.id) ? <HeartOff className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              </Button>
              <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                NEW
              </div>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-muted-foreground">{product.category}</p>
            <p className="font-semibold mt-1">₩{product.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

