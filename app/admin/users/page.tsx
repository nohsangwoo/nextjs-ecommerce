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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockUsers } from "@/lib/mock-data"
import { Ban, Download, Edit, Eye, Mail, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function AdminUsersPage() {
  const [users] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [membershipFilter, setMembershipFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  // 회원 가입일 기준으로 정렬 (최신순)
  const sortedUsers = [...users].sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())

  const getFilteredUsers = (tab: string) => {
    return sortedUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())

      // 실제로는 회원 등급 필드가 있을 것이지만, 여기서는 주문 수를 기준으로 필터링
      const matchesMembership =
        membershipFilter === "all" ||
        (membershipFilter === "vip" && user.orders.length >= 3) ||
        (membershipFilter === "regular" && user.orders.length >= 1 && user.orders.length < 3) ||
        (membershipFilter === "new" && user.orders.length === 0)

      // 탭 필터링 (실제로는 활성/비활성 상태가 있을 것이지만, 여기서는 최근 로그인 기준으로 구분)
      let matchesTab = true
      if (tab === "active") {
        // 최근 30일 이내 로그인한 사용자를 활성 사용자로 간주
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        matchesTab = new Date(user.lastLogin) >= thirtyDaysAgo
      } else if (tab === "inactive") {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        matchesTab = new Date(user.lastLogin) < thirtyDaysAgo
      }

      return matchesSearch && matchesMembership && matchesTab
    })
  }

  const getMembershipBadge = (orderCount: number) => {
    if (orderCount >= 3) {
      return <Badge variant="default">VIP</Badge>
    } else if (orderCount >= 1) {
      return <Badge variant="secondary">일반</Badge>
    } else {
      return <Badge variant="outline">신규</Badge>
    }
  }

  const getActivityStatus = (lastLogin: string) => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    if (new Date(lastLogin) >= thirtyDaysAgo) {
      return <Badge variant="success">활성</Badge>
    } else {
      return <Badge variant="outline">비활성</Badge>
    }
  }

  const UsersTable = ({ users }: { users: typeof mockUsers }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>회원</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>가입일</TableHead>
          <TableHead>최근 로그인</TableHead>
          <TableHead>주문 수</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.id}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.orders.length}
                  {getMembershipBadge(user.orders.length)}
                </div>
              </TableCell>
              <TableCell>{getActivityStatus(user.lastLogin)}</TableCell>
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
                      <span>상세 정보</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>정보 수정</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>이메일 발송</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Ban className="mr-2 h-4 w-4" />
                      <span>계정 비활성화</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              회원 정보가 없습니다
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">회원 관리</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                회원 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>새 회원 추가</DialogTitle>
                <DialogDescription>새로운 회원 정보를 입력하세요. 이메일은 필수 항목입니다.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="이름을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" placeholder="전화번호를 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">생년월일</Label>
                    <Input id="birthdate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">임시 비밀번호</Label>
                  <Input id="password" type="password" placeholder="임시 비밀번호를 입력하세요" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sendEmail" />
                  <Label htmlFor="sendEmail">가입 안내 이메일 발송</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">저장하기</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 회원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">전월 대비 +12명 증가</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 회원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                users.filter((user) => {
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  return new Date(user.lastLogin) >= thirtyDaysAgo
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">최근 30일 이내 로그인</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">신규 회원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                users.filter((user) => {
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  return new Date(user.joinDate) >= thirtyDaysAgo
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">최근 30일 이내 가입</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP 회원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((user) => user.orders.length >= 3).length}</div>
            <p className="text-xs text-muted-foreground">3회 이상 구매 회원</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="이름, 이메일 또는 전화번호 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={membershipFilter} onValueChange={setMembershipFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="회원 등급" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 등급</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="regular">일반</SelectItem>
              <SelectItem value="new">신규</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange className="max-w-sm" />
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="active">활성 회원</TabsTrigger>
          <TabsTrigger value="inactive">비활성 회원</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="border rounded-lg mt-4">
          <UsersTable users={getFilteredUsers("all")} />
        </TabsContent>
        <TabsContent value="active" className="border rounded-lg mt-4">
          <UsersTable users={getFilteredUsers("active")} />
        </TabsContent>
        <TabsContent value="inactive" className="border rounded-lg mt-4">
          <UsersTable users={getFilteredUsers("inactive")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

