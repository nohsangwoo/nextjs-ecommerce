"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItemType } from "@/lib/types"

interface CartContextType {
  cart: CartItemType[]
  addToCart: (item: CartItemType) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([])

  // 로컬 스토리지에서 장바구니 데이터 로드
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("장바구니 데이터를 불러오는 중 오류가 발생했습니다:", error)
        setCart([])
      }
    }
  }, [])

  // 장바구니 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItemType) => {
    setCart((prevCart) => {
      // 이미 장바구니에 있는 상품인지 확인 (동일한 상품 ID와 사이즈)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.selectedSize === item.selectedSize,
      )

      if (existingItemIndex >= 0) {
        // 이미 있는 상품이면 수량만 증가
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // 새 상품이면 장바구니에 추가
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: string, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.selectedSize === size)))
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id && item.selectedSize === size ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

