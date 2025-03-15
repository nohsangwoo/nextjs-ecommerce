import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// 인기 상품 데이터 (실제로는 API에서 가져올 것)
const topProducts = [
  { id: "p1", name: "오버사이즈 티셔츠", image: "/placeholder.svg", sales: 120, percentage: 100 },
  { id: "p6", name: "가죽 스니커즈", image: "/placeholder.svg", sales: 95, percentage: 79 },
  { id: "p4", name: "니트 스웨터", image: "/placeholder.svg", sales: 82, percentage: 68 },
  { id: "p2", name: "슬림핏 청바지", image: "/placeholder.svg", sales: 78, percentage: 65 },
  { id: "p5", name: "플리스 자켓", image: "/placeholder.svg", sales: 65, percentage: 54 },
]

export function TopSellingProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.id} className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.sales}개 판매</p>
            </div>
          </div>
          <Progress value={product.percentage} className="h-2" />
        </div>
      ))}
    </div>
  )
}

