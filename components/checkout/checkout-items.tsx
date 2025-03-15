"use client"

import Image from "next/image"
import { useCart } from "@/context/cart-context"

export function CheckoutItems() {
  const { cart } = useCart()

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={`${item.id}-${item.selectedSize}`} className="flex items-start space-x-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-sm">{item.name}</h3>
            <p className="text-xs text-muted-foreground">사이즈: {item.selectedSize}</p>
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">수량: {item.quantity}</p>
              <p className="text-sm font-semibold">₩{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

