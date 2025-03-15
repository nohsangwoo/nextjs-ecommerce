export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  discount: number
  category: string
  image: string
  stock: number
  isNew: boolean
}

export interface CartItemType extends Product {
  quantity: number
  selectedSize: string
}

export interface Order {
  id: string
  customer: string
  date: string
  total: number
  status: string
  items: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  birthdate: string
  joinDate: string
  lastLogin: string
  orders: {
    id: string
    date: string
    total: number
    itemCount: number
    status: string
  }[]
}

