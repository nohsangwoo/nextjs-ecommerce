"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (newQuantity > 0) {
      updateQuantity(item.id, item.selectedSize, newQuantity)
    }
  }

  const incrementQuantity = () => {
    updateQuantity(item.id, item.selectedSize, item.quantity + 1)
  }

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.selectedSize, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id, item.selectedSize)
  }

  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">사이즈: {item.selectedSize}</p>
        <p className="font-semibold">₩{item.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={decrementQuantity}>
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="h-8 w-12 text-center"
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

