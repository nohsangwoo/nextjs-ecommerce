"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowDownIcon, ArrowUpIcon, ShoppingBag, Users, CreditCard, Package } from "lucide-react"
import { mockSalesData, mockOrdersData, mockProducts, mockOrders, mockUsers } from "@/lib/mock-data"
import { RecentOrders } from "@/components/admin/recent-orders"
import { LowStockProducts } from "@/components/admin/low-stock-products"
import { TopSellingProducts } from "@/components/admin/top-selling-products"

// 추가 차트 데이터
const categoryData = [
  { name: "남성", value: 35 },
  { name: "여성", value: 45 },
  { name: "액세서리", value: 15 },
  { name: "신발", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("month")

  // 통계 계산
  const totalSales = mockSalesData.reduce((sum, item) => sum + item.value, 0)
  const totalOrders = mockOrders.length
  const totalCustomers = mockUsers.length
  const lowStockCount = mockProducts.filter((p) => p.stock < 10).length

  // 최근 주문 5개
  const recentOrders = [...mockOrders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // 재고 부족 상품
  const lowStockProducts = mockProducts.filter((p) => p.stock < 10)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="week">주간</TabsTrigger>
              <TabsTrigger value="month">월간</TabsTrigger>
              <TabsTrigger value="year">연간</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{totalSales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">12.5%</span>
              <span className="ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">8.2%</span>
              <span className="ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 회원</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">5.7%</span>
              <span className="ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">재고 부족</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">3 상품</span>
              <span className="ml-1">재고 부족</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>매출 현황</CardTitle>
            <CardDescription>
              {timeRange === "week" ? "이번 주" : timeRange === "month" ? "이번 달" : "올해"} 매출 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "매출"]} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>카테고리별 판매 비율</CardTitle>
            <CardDescription>카테고리별 판매 비중</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, "비율"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 5개 주문 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders orders={recentOrders} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>재고 부족 상품</CardTitle>
            <CardDescription>재고가 10개 미만인 상품</CardDescription>
          </CardHeader>
          <CardContent>
            <LowStockProducts products={lowStockProducts} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>주문 현황</CardTitle>
            <CardDescription>
              {timeRange === "week" ? "이번 주" : timeRange === "month" ? "이번 달" : "올해"} 주문 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}건`, "주문"]} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>인기 상품</CardTitle>
            <CardDescription>가장 많이 판매된 상품</CardDescription>
          </CardHeader>
          <CardContent>
            <TopSellingProducts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

