"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import type { Product } from "@/lib/types"
import { Heart, HeartOff } from "lucide-react"

export function ProductGrid({ products }: { products: Product[] }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
            <Button
              variant={isInWishlist(product.id) ? "destructive" : "secondary"}
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
              onClick={(e) => toggleWishlist(e, product)}
            >
              {isInWishlist(product.id) ? <HeartOff className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
            </Button>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {product.isNew && (
              <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                NEW
              </div>
            )}
            {product.discount > 0 && (
              <div className="absolute top-2 right-12 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
          </div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-semibold">₩{product.price.toLocaleString()}</p>
            {product.originalPrice > 0 && (
              <p className="text-sm text-muted-foreground line-through">₩{product.originalPrice.toLocaleString()}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

