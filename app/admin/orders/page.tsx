"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockOrders } from "@/lib/mock-data"
import { Download, Eye, MoreHorizontal, Search, Upload } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { Order } from "@/lib/types"

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  const getFilteredOrders = (tab: string) => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      let matchesTab = true
      if (tab === "pending") {
        matchesTab = ["결제대기", "결제완료", "배송준비"].includes(order.status)
      } else if (tab === "shipping") {
        matchesTab = ["배송중"].includes(order.status)
      } else if (tab === "completed") {
        matchesTab = ["배송완료"].includes(order.status)
      } else if (tab === "canceled") {
        matchesTab = ["취소"].includes(order.status)
      }

      return matchesSearch && matchesStatus && matchesTab
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "결제대기":
        return <Badge variant="outline">결제대기</Badge>
      case "결제완료":
        return <Badge variant="secondary">결제완료</Badge>
      case "배송준비":
        return <Badge variant="secondary">배송준비</Badge>
      case "배송중":
        return <Badge variant="default">배송중</Badge>
      case "배송완료":
        return <Badge variant="success">배송완료</Badge>
      case "취소":
        return <Badge variant="destructive">취소</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const OrdersTable = ({ orders }: { orders: Order[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>고객명</TableHead>
          <TableHead>주문일자</TableHead>
          <TableHead>금액</TableHead>
          <TableHead>상품 수</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>₩{order.total.toLocaleString()}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>작업</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>상세 보기</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>송장 출력</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <span>상태 변경</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              주문 내역이 없습니다
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">주문 관리</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="주문번호 또는 고객명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="결제대기">결제대기</SelectItem>
              <SelectItem value="결제완료">결제완료</SelectItem>
              <SelectItem value="배송준비">배송준비</SelectItem>
              <SelectItem value="배송중">배송중</SelectItem>
              <SelectItem value="배송완료">배송완료</SelectItem>
              <SelectItem value="취소">취소</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange className="max-w-sm" />
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">처리중</TabsTrigger>
          <TabsTrigger value="shipping">배송중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
          <TabsTrigger value="canceled">취소</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="border rounded-lg mt-4">
          <OrdersTable orders={getFilteredOrders("all")} />
        </TabsContent>
        <TabsContent value="pending" className="border rounded-lg mt-4">
          <OrdersTable orders={getFilteredOrders("pending")} />
        </TabsContent>
        <TabsContent value="shipping" className="border rounded-lg mt-4">
          <OrdersTable orders={getFilteredOrders("shipping")} />
        </TabsContent>
        <TabsContent value="completed" className="border rounded-lg mt-4">
          <OrdersTable orders={getFilteredOrders("completed")} />
        </TabsContent>
        <TabsContent value="canceled" className="border rounded-lg mt-4">
          <OrdersTable orders={getFilteredOrders("canceled")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

