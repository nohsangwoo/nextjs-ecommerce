"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { cart, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-muted rounded-full p-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">장바구니가 비어있습니다</h2>
          <p className="text-muted-foreground max-w-md">장바구니에 상품을 추가하고 쇼핑을 계속해보세요.</p>
          <Button asChild className="mt-4">
            <Link href="/products">쇼핑 계속하기</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={clearCart}>
              장바구니 비우기
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">쇼핑 계속하기</Link>
            </Button>
          </div>
        </div>

        <div>
          <CartSummary />
          <Button asChild className="w-full mt-4">
            <Link href="/checkout">결제하기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

