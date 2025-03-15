"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockSalesData, mockOrdersData } from "@/lib/mock-data"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>매출 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주문 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">새로운 주문</p>
                <p className="text-sm text-muted-foreground">홍길동님이 ₩120,000 상당의 주문을 완료했습니다.</p>
              </div>
              <p className="text-sm text-muted-foreground">10분 전</p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">재고 부족 알림</p>
                <p className="text-sm text-muted-foreground">청바지 M 사이즈의 재고가 5개 미만입니다.</p>
              </div>
              <p className="text-sm text-muted-foreground">1시간 전</p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">신규 회원 가입</p>
                <p className="text-sm text-muted-foreground">김철수님이 새로 가입했습니다.</p>
              </div>
              <p className="text-sm text-muted-foreground">3시간 전</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

