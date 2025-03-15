"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Eye, Grid, LayoutGrid, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"

// 카테고리 데이터 (실제로는 API에서 가져올 것)
const categories = [
  {
    id: "cat1",
    name: "남성",
    slug: "men",
    description: "남성 의류 및 액세서리",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 24,
    featured: true,
    parent: null,
    createdAt: "2023-01-15",
  },
  {
    id: "cat2",
    name: "여성",
    slug: "women",
    description: "여성 의류 및 액세서리",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 36,
    featured: true,
    parent: null,
    createdAt: "2023-01-15",
  },
  {
    id: "cat3",
    name: "액세서리",
    slug: "accessories",
    description: "다양한 액세서리 제품",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 18,
    featured: true,
    parent: null,
    createdAt: "2023-01-20",
  },
  {
    id: "cat4",
    name: "신발",
    slug: "shoes",
    description: "남녀 공용 신발",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 12,
    featured: true,
    parent: null,
    createdAt: "2023-01-25",
  },
  {
    id: "cat5",
    name: "티셔츠",
    slug: "tshirts",
    description: "다양한 스타일의 티셔츠",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 15,
    featured: false,
    parent: "cat1",
    createdAt: "2023-02-10",
  },
  {
    id: "cat6",
    name: "청바지",
    slug: "jeans",
    description: "다양한 스타일의 청바지",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 10,
    featured: false,
    parent: "cat1",
    createdAt: "2023-02-15",
  },
  {
    id: "cat7",
    name: "드레스",
    slug: "dresses",
    description: "다양한 스타일의 드레스",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 20,
    featured: false,
    parent: "cat2",
    createdAt: "2023-02-20",
  },
  {
    id: "cat8",
    name: "스커트",
    slug: "skirts",
    description: "다양한 스타일의 스커트",
    image: "/placeholder.svg?height=300&width=300",
    productCount: 8,
    featured: false,
    parent: "cat2",
    createdAt: "2023-02-25",
  },
]

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [editingCategory, setEditingCategory] = useState<(typeof categories)[0] | null>(null)

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 부모 카테고리만 필터링
  const parentCategories = categories.filter((category) => category.parent === null)

  // 특정 부모 카테고리의 하위 카테고리 가져오기
  const getChildCategories = (parentId: string) => {
    return categories.filter((category) => category.parent === parentId)
  }

  const handleEditCategory = (category: (typeof categories)[0]) => {
    setEditingCategory(category)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">카테고리 관리</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                카테고리 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>새 카테고리 추가</DialogTitle>
                <DialogDescription>새로운 카테고리 정보를 입력하세요. 카테고리명은 필수 항목입니다.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">카테고리명</Label>
                    <Input id="name" placeholder="카테고리명을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">슬러그</Label>
                    <Input id="slug" placeholder="URL에 사용될 슬러그" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">설명</Label>
                  <Textarea id="description" placeholder="카테고리 설명을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent">상위 카테고리</Label>
                  <select
                    id="parent"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">없음 (최상위 카테고리)</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>카테고리 이미지</Label>
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
                  <Switch id="featured" />
                  <Label htmlFor="featured">메인 페이지에 표시</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">저장하기</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
            {viewMode === "list" ? (
              <>
                <LayoutGrid className="mr-2 h-4 w-4" /> 그리드 보기
              </>
            ) : (
              <>
                <Grid className="mr-2 h-4 w-4" /> 리스트 보기
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">최상위 카테고리 {parentCategories.length}개</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">메인 표시 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((cat) => cat.featured).length}</div>
            <p className="text-xs text-muted-foreground">메인 페이지에 표시되는 카테고리</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">상품 없는 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter((cat) => cat.productCount === 0).length}</div>
            <p className="text-xs text-muted-foreground">상품이 없는 카테고리 수</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 상품 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(categories.reduce((acc, cat) => acc + cat.productCount, 0) / categories.length)}
            </div>
            <p className="text-xs text-muted-foreground">카테고리당 평균 상품 수</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="카테고리명 또는 설명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">이미지</TableHead>
                <TableHead>카테고리명</TableHead>
                <TableHead>슬러그</TableHead>
                <TableHead>상위 카테고리</TableHead>
                <TableHead className="text-right">상품 수</TableHead>
                <TableHead>메인 표시</TableHead>
                <TableHead>생성일</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    {category.parent ? categories.find((cat) => cat.id === category.parent)?.name || "-" : "-"}
                  </TableCell>
                  <TableCell className="text-right">{category.productCount}</TableCell>
                  <TableCell>
                    {category.featured ? (
                      <Badge variant="default">표시</Badge>
                    ) : (
                      <Badge variant="outline">미표시</Badge>
                    )}
                  </TableCell>
                  <TableCell>{category.createdAt}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>수정</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>상품 보기</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>삭제</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                              <AlertDialogDescription>
                                정말로 이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 카테고리에 속한 모든
                                상품은 카테고리가 없는 상태가 됩니다.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700">삭제</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                {category.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default">메인 표시</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>수정</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>상품 보기</span>
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>삭제</span>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
                            <AlertDialogDescription>
                              정말로 이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">삭제</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {category.parent
                    ? `상위 카테고리: ${categories.find((cat) => cat.id === category.parent)?.name}`
                    : "최상위 카테고리"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span>상품 {category.productCount}개</span>
                  <span>슬러그: {category.slug}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 카테고리 수정 다이얼로그 */}
      {editingCategory && (
        <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>카테고리 수정</DialogTitle>
              <DialogDescription>카테고리 정보를 수정하세요.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">카테고리명</Label>
                  <Input id="edit-name" defaultValue={editingCategory.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">슬러그</Label>
                  <Input id="edit-slug" defaultValue={editingCategory.slug} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">설명</Label>
                <Textarea id="edit-description" defaultValue={editingCategory.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-parent">상위 카테고리</Label>
                <select
                  id="edit-parent"
                  defaultValue={editingCategory.parent || ""}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">없음 (최상위 카테고리)</option>
                  {parentCategories
                    .filter((cat) => cat.id !== editingCategory.id) // 자기 자신은 제외
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>현재 이미지</Label>
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <Image
                    src={editingCategory.image || "/placeholder.svg"}
                    alt={editingCategory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center mt-4">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">새 이미지를 드래그하거나 클릭하여 업로드하세요</p>
                  <Input id="edit-image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    파일 선택
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="edit-featured" defaultChecked={editingCategory.featured} />
                <Label htmlFor="edit-featured">메인 페이지에 표시</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
              <Button type="submit">저장하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

