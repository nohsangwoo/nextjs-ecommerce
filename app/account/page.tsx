"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUser } from "@/lib/mock-data"
import { useAuth } from "@/context/auth-context"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [userData, setUserData] = useState(mockUser)

  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // 로딩 중이거나 로그인되지 않은 경우 렌더링하지 않음
  if (isLoading || !user) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 프로필 업데이트 로직 (모킹)
    alert("프로필이 업데이트되었습니다.")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">내 계정</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">프로필</TabsTrigger>
          <TabsTrigger value="orders">주문 내역</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" value={userData.email} disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">생년월일</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={userData.birthdate}
                    onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit">저장하기</Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">주문 내역</h2>
            {mockUser.orders.length > 0 ? (
              <div className="space-y-4">
                {mockUser.orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">주문번호: {order.id}</span>
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>상품 {order.itemCount}개</span>
                      <span className="font-semibold">₩{order.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "배송완료"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {order.status}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}`}>상세보기</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">주문 내역이 없습니다.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">계정 설정</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">비밀번호 변경</h3>
                  <p className="text-sm text-muted-foreground">계정 보안을 위해 주기적으로 비밀번호를 변경하세요.</p>
                </div>
                <Button variant="outline">변경하기</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">마케팅 이메일</h3>
                  <p className="text-sm text-muted-foreground">프로모션 및 할인 정보를 이메일로 받아보세요.</p>
                </div>
                <Button variant="outline">구독 관리</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">계정 삭제</h3>
                  <p className="text-sm text-muted-foreground">모든 데이터가 영구적으로 삭제됩니다.</p>
                </div>
                <Button variant="destructive">계정 삭제</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

