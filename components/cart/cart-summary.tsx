"use client"

import { useCart } from "@/context/cart-context"

export function CartSummary() {
  const { cart } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 3000 : 0 // 배송비 (3,000원, 무료 배송 조건 추가 가능)
  const total = subtotal + shipping

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">주문 요약</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">상품 금액</span>
          <span>₩{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">배송비</span>
          <span>₩{shipping.toLocaleString()}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>총 결제 금액</span>
            <span>₩{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

