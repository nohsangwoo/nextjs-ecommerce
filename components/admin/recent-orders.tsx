import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"
import { Eye } from "lucide-react"
import Link from "next/link"

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={order.customer} />
              <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">₩{order.total.toLocaleString()}</p>
              <Badge
                variant={order.status === "배송완료" ? "success" : order.status === "취소" ? "destructive" : "default"}
              >
                {order.status}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/orders/${order.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

