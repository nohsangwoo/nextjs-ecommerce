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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { mockProducts } from "@/lib/mock-data"
import { Edit, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"

export default function AdminProductsPage() {
  const [products] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock < 10) ||
      (stockFilter === "out" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">상품 관리</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              상품 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>새 상품 추가</DialogTitle>
              <DialogDescription>새로운 상품 정보를 입력하세요. 모든 필드를 채워야 합니다.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">상품명</Label>
                  <Input id="name" placeholder="상품명을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">가격</Label>
                  <Input id="price" type="number" placeholder="가격을 입력하세요" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">재고</Label>
                  <Input id="stock" type="number" placeholder="재고 수량을 입력하세요" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">상품 설명</Label>
                <Textarea id="description" placeholder="상품 설명을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label>상품 이미지</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">이미지를 드래그하거나 클릭하여 업로드하세요</p>
                  <Input id="image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    파일 선택
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isNew" />
                <Label htmlFor="isNew">신상품으로 표시</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">저장하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="상품명 또는 설명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="카테고리 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 카테고리</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="재고 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 재고</SelectItem>
              <SelectItem value="low">재고 부족 (10개 미만)</SelectItem>
              <SelectItem value="out">품절 (0개)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            엑셀 업로드
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">이미지</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead className="text-right">가격</TableHead>
              <TableHead className="text-right">재고</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">₩{product.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className={product.stock < 10 ? "text-red-500 font-medium" : ""}>{product.stock}</span>
                </TableCell>
                <TableCell>
                  {product.isNew ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      신상품
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      일반
                    </span>
                  )}
                </TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        <span>수정</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>재고 추가</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>삭제</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

