"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { BarChart3, Package, ShoppingCart, Users, Settings, LayoutDashboard, Tag, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // 로그인 상태 및 관리자 권한 확인
  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // 로딩 중이거나 권한이 없는 경우 렌더링하지 않음
  if (isLoading || !user || !user.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">접근 권한이 없습니다</h1>
          <p className="text-muted-foreground mb-4">관리자 권한이 필요한 페이지입니다.</p>
          <Button asChild>
            <Link href="/login">로그인 페이지로 이동</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "대시보드",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "상품 관리",
      href: "/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "주문 관리",
      href: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "회원 관리",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "카테고리 관리",
      href: "/admin/categories",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      title: "통계 분석",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "설정",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-muted/40 border-r">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>관리자 페이지</span>
          </Link>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={isActive(item.href) ? "secondary" : "ghost"} className="w-full justify-start">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>내 계정</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>설정</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>관리자 나가기</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

