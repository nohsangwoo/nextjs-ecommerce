import Link from "next/link"
import Image from "next/image"
import { mockProducts } from "@/lib/mock-data"

interface ProductRecommendationsProps {
  currentProductId: string
}

export function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  // 현재 상품을 제외한 다른 상품 중 4개를 추천 (실제로는 pgvector 유사도 검색 결과를 사용)
  const recommendedProducts = mockProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {recommendedProducts.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-muted-foreground">{product.category}</p>
          <p className="font-semibold mt-1">₩{product.price.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  )
}

