"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { ProductRecommendations } from "@/components/products/product-recommendations"
import { mockProducts } from "@/lib/mock-data"
import { Heart, HeartOff } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts.find((p) => p.id === productId) || mockProducts[0]
  const [selectedSize, setSelectedSize] = useState("")
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요")
      return
    }

    addToCart({
      ...product,
      selectedSize,
      quantity: 1,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">₩{product.price.toLocaleString()}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">사이즈 선택</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">상품 설명</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="pt-4 space-y-4">
            <Button onClick={handleAddToCart} className="w-full">
              장바구니에 추가
            </Button>
            <Button variant={inWishlist ? "destructive" : "outline"} className="w-full" onClick={toggleWishlist}>
              {inWishlist ? (
                <>
                  <HeartOff className="mr-2 h-4 w-4" />찜 목록에서 제거
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />찜 목록에 추가
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full">
              바로 구매하기
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">추천 상품</h2>
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  )
}

