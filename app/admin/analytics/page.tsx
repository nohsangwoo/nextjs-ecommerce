"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  AreaChart,
  Area,
} from "recharts"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Download, TrendingDown, TrendingUp } from "lucide-react"

// 매출 데이터
const salesData = [
  { name: "1월", value: 1200000 },
  { name: "2월", value: 1500000 },
  { name: "3월", value: 1800000 },
  { name: "4월", value: 1600000 },
  { name: "5월", value: 2100000 },
  { name: "6월", value: 2400000 },
  { name: "7월", value: 2200000 },
  { name: "8월", value: 2600000 },
  { name: "9월", value: 2800000 },
  { name: "10월", value: 3000000 },
  { name: "11월", value: 3200000 },
  { name: "12월", value: 3500000 },
]

// 주문 데이터
const ordersData = [
  { name: "1월", value: 45 },
  { name: "2월", value: 52 },
  { name: "3월", value: 61 },
  { name: "4월", value: 58 },
  { name: "5월", value: 72 },
  { name: "6월", value: 80 },
  { name: "7월", value: 75 },
  { name: "8월", value: 90 },
  { name: "9월", value: 95 },
  { name: "10월", value: 100 },
  { name: "11월", value: 110 },
  { name: "12월", value: 120 },
]

// 카테고리별 판매 데이터
const categoryData = [
  { name: "남성", value: 35 },
  { name: "여성", value: 45 },
  { name: "액세서리", value: 15 },
  { name: "신발", value: 5 },
]

// 상품별 판매 데이터
const productSalesData = [
  { name: "오버사이즈 티셔츠", value: 120 },
  { name: "슬림핏 청바지", value: 95 },
  { name: "니트 스웨터", value: 82 },
  { name: "가죽 스니커즈", value: 78 },
  { name: "플리스 자켓", value: 65 },
  { name: "캔버스 백팩", value: 60 },
  { name: "울 코트", value: 55 },
  { name: "캐주얼 셔츠", value: 50 },
]

// 방문자 데이터
const visitorData = [
  { name: "1월", desktop: 1200, mobile: 1800, tablet: 600 },
  { name: "2월", desktop: 1300, mobile: 1900, tablet: 650 },
  { name: "3월", desktop: 1400, mobile: 2100, tablet: 700 },
  { name: "4월", desktop: 1350, mobile: 2000, tablet: 680 },
  { name: "5월", desktop: 1500, mobile: 2200, tablet: 720 },
  { name: "6월", desktop: 1600, mobile: 2400, tablet: 750 },
  { name: "7월", desktop: 1550, mobile: 2300, tablet: 730 },
  { name: "8월", desktop: 1700, mobile: 2500, tablet: 780 },
  { name: "9월", desktop: 1800, mobile: 2600, tablet: 800 },
  { name: "10월", desktop: 1900, mobile: 2700, tablet: 820 },
  { name: "11월", desktop: 2000, mobile: 2800, tablet: 850 },
  { name: "12월", desktop: 2100, mobile: 3000, tablet: 900 },
]

// 전환율 데이터
const conversionData = [
  { name: "1월", rate: 2.5 },
  { name: "2월", rate: 2.7 },
  { name: "3월", rate: 3.0 },
  { name: "4월", rate: 2.8 },
  { name: "5월", rate: 3.2 },
  { name: "6월", rate: 3.5 },
  { name: "7월", rate: 3.3 },
  { name: "8월", rate: 3.7 },
  { name: "9월", rate: 3.9 },
  { name: "10월", rate: 4.1 },
  { name: "11월", rate: 4.3 },
  { name: "12월", rate: 4.5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [compareMode, setCompareMode] = useState("none")

  // 총 매출 계산
  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0)

  // 전월 대비 매출 증가율 계산
  const lastMonthSales = salesData[salesData.length - 2].value
  const currentMonthSales = salesData[salesData.length - 1].value
  const salesGrowth = ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100

  // 총 주문 수 계산
  const totalOrders = ordersData.reduce((sum, item) => sum + item.value, 0)

  // 전월 대비 주문 증가율 계산
  const lastMonthOrders = ordersData[ordersData.length - 2].value
  const currentMonthOrders = ordersData[ordersData.length - 1].value
  const ordersGrowth = ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100

  // 평균 주문 금액 계산
  const averageOrderValue = totalSales / totalOrders

  // 전환율 평균 계산
  const averageConversionRate = conversionData.reduce((sum, item) => sum + item.rate, 0) / conversionData.length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">통계 분석</h2>
        <div className="flex items-center gap-2">
          <DatePickerWithRange className="max-w-sm" />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            보고서 다운로드
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출</CardTitle>
            {salesGrowth > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{totalSales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={salesGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {salesGrowth > 0 ? "+" : ""}
                {salesGrowth.toFixed(1)}%
              </span>
              <span className="ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문</CardTitle>
            {ordersGrowth > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={ordersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {ordersGrowth > 0 ? "+" : ""}
                {ordersGrowth.toFixed(1)}%
              </span>
              <span className="ml-1">전월 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 주문 금액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₩{averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground">주문당 평균 금액</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전환율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageConversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">방문자 대비 구매 비율</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">매출 분석</TabsTrigger>
            <TabsTrigger value="products">상품 분석</TabsTrigger>
            <TabsTrigger value="visitors">방문자 분석</TabsTrigger>
            <TabsTrigger value="conversion">전환율 분석</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between mt-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">주간</SelectItem>
                <SelectItem value="month">월간</SelectItem>
                <SelectItem value="quarter">분기</SelectItem>
                <SelectItem value="year">연간</SelectItem>
              </SelectContent>
            </Select>

            <Select value={compareMode} onValueChange={setCompareMode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="비교 모드" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">비교 없음</SelectItem>
                <SelectItem value="previous">이전 기간과 비교</SelectItem>
                <SelectItem value="year">작년 동기간과 비교</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="sales" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>매출 추이</CardTitle>
                <CardDescription>
                  {timeRange === "week"
                    ? "주간"
                    : timeRange === "month"
                      ? "월간"
                      : timeRange === "quarter"
                        ? "분기별"
                        : "연간"}{" "}
                  매출 추이
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, "매출"]} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>카테고리별 매출</CardTitle>
                  <CardDescription>카테고리별 매출 비중</CardDescription>
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

              <Card>
                <CardHeader>
                  <CardTitle>주문 추이</CardTitle>
                  <CardDescription>
                    {timeRange === "week"
                      ? "주간"
                      : timeRange === "month"
                        ? "월간"
                        : timeRange === "quarter"
                          ? "분기별"
                          : "연간"}{" "}
                    주문 추이
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}건`, "주문"]} />
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>상품별 판매량</CardTitle>
                <CardDescription>가장 많이 판매된 상품</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={productSalesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value}개`, "판매량"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>카테고리별 판매량</CardTitle>
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

              <Card>
                <CardHeader>
                  <CardTitle>재고 현황</CardTitle>
                  <CardDescription>카테고리별 재고 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}개`, "재고"]} />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visitors" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>방문자 추이</CardTitle>
                <CardDescription>
                  {timeRange === "week"
                    ? "주간"
                    : timeRange === "month"
                      ? "월간"
                      : timeRange === "quarter"
                        ? "분기별"
                        : "연간"}{" "}
                  방문자 추이
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="desktop"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="데스크톱"
                    />
                    <Area type="monotone" dataKey="mobile" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="모바일" />
                    <Area type="monotone" dataKey="tablet" stackId="1" stroke="#ffc658" fill="#ffc658" name="태블릿" />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>디바이스 비율</CardTitle>
                  <CardDescription>방문자 디바이스 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "데스크톱", value: 40 },
                          { name: "모바일", value: 50 },
                          { name: "태블릿", value: 10 },
                        ]}
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

              <Card>
                <CardHeader>
                  <CardTitle>페이지 방문 통계</CardTitle>
                  <CardDescription>가장 많이 방문한 페이지</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: "홈", value: 5000 },
                        { name: "상품 목록", value: 4200 },
                        { name: "상품 상세", value: 3800 },
                        { name: "장바구니", value: 2500 },
                        { name: "결제", value: 1800 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()}회`, "방문"]} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversion" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>전환율 추이</CardTitle>
                <CardDescription>
                  {timeRange === "week"
                    ? "주간"
                    : timeRange === "month"
                      ? "월간"
                      : timeRange === "quarter"
                        ? "분기별"
                        : "연간"}{" "}
                  전환율 추이
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "전환율"]} />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>구매 단계별 이탈률</CardTitle>
                  <CardDescription>각 단계별 이탈률</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: "상품 목록", value: 30 },
                        { name: "상품 상세", value: 25 },
                        { name: "장바구니", value: 40 },
                        { name: "결제 정보", value: 15 },
                        { name: "결제 완료", value: 5 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, "이탈률"]} />
                      <Bar dataKey="value" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>재방문율</CardTitle>
                  <CardDescription>방문자 재방문율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "첫 방문", value: 65 },
                          { name: "재방문", value: 35 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#8884d8" />
                        <Cell fill="#82ca9d" />
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => [`${value}%`, "비율"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

