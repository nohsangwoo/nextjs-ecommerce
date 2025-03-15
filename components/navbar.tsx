"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Menu, X, Sun, Moon, Heart, LogIn, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLogout = () => {
    logout()
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                홈
              </Link>
              <Link href="/products" className="text-lg font-medium transition-colors hover:text-primary">
                상품
              </Link>
              <Link href="/account" className="text-lg font-medium transition-colors hover:text-primary">
                내 계정
              </Link>
              {user?.isAdmin && (
                <Link href="/admin" className="text-lg font-medium transition-colors hover:text-primary">
                  관리자
                </Link>
              )}
              {!user ? (
                <Link href="/login" className="text-lg font-medium transition-colors hover:text-primary">
                  로그인
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-lg font-medium text-left transition-colors hover:text-primary"
                >
                  로그아웃
                </button>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">ASOS Style</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className={`transition-colors hover:text-primary ${isActive("/") ? "text-primary" : ""}`}>
            홈
          </Link>
          <Link
            href="/products"
            className={`transition-colors hover:text-primary ${isActive("/products") ? "text-primary" : ""}`}
          >
            상품
          </Link>
          <Link
            href="/account"
            className={`transition-colors hover:text-primary ${isActive("/account") ? "text-primary" : ""}`}
          >
            내 계정
          </Link>
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`transition-colors hover:text-primary ${isActive("/admin") ? "text-primary" : ""}`}
            >
              관리자
            </Link>
          )}
        </nav>

        <div className="flex items-center ml-auto">
          {isSearchOpen ? (
            <div className="relative mr-2">
              <Input type="search" placeholder="검색어를 입력하세요..." className="w-[200px] md:w-[300px]" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">검색</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">테마 변경</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">내 계정</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">주문 내역</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">찜 목록</Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">관리자 페이지</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">로그인</span>
              </Button>
            </Link>
          )}

          <Link href="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">찜 목록</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">장바구니</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

