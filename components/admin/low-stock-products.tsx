import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { Package, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LowStockProductsProps {
  products: Product[]
}

export function LowStockProducts({ products }: LowStockProductsProps) {
  return (
    <div className="space-y-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  재고: <span className="text-red-500 font-medium">{product.stock}</span>
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/products/${product.id}`}>
                <Plus className="mr-2 h-4 w-4" />
                재고 추가
              </Link>
            </Button>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-3">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <p className="font-medium">재고 부족 상품이 없습니다</p>
          <p className="text-sm text-muted-foreground">모든 상품의 재고가 충분합니다</p>
        </div>
      )}
    </div>
  )
}

