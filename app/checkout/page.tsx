"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartSummary } from "@/components/cart/cart-summary"
import { CheckoutItems } from "@/components/checkout/checkout-items"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 결제 처리를 시뮬레이션
    setTimeout(() => {
      // 결제 성공 후 장바구니 비우기
      clearCart()
      router.push("/checkout/success")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">결제하기</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4 p-6 border rounded-lg">
              <h2 className="text-xl font-semibold">배송 정보</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input id="phone" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input id="address" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressDetail">상세주소</Label>
                <Input id="addressDetail" required />
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h2 className="text-xl font-semibold">결제 정보</h2>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">카드 번호</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">만료일</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "처리 중..." : "결제 완료하기"}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
            <CheckoutItems />
          </div>

          <div className="p-6 border rounded-lg">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

