"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart({
      ...product,
      selectedSize: "M", // 기본 사이즈 설정
      quantity: 1,
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-muted rounded-full p-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">찜 목록이 비어있습니다</h2>
          <p className="text-muted-foreground max-w-md">마음에 드는 상품을 찜해보세요.</p>
          <Button asChild className="mt-4">
            <Link href="/products">쇼핑 계속하기</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">찜 목록</h1>
        <Button variant="outline" onClick={clearWishlist}>
          <Trash2 className="mr-2 h-4 w-4" />
          전체 삭제
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden group">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium truncate">{product.name}</h3>
              </Link>
              <p className="text-muted-foreground text-sm">{product.category}</p>
              <p className="font-semibold mt-1">₩{product.price.toLocaleString()}</p>

              <Button className="w-full mt-4" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                장바구니에 추가
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

