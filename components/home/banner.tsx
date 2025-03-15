import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Banner() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Image src="/placeholder.svg?height=600&width=1200" alt="Banner image" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">새로운 시즌, 새로운 스타일</h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
          최신 트렌드의 컬렉션으로 당신만의 스타일을 완성하세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link href="/products">쇼핑하기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white/20 dark:text-white dark:border-white dark:hover:bg-white/20 bg-black/60 hover:bg-black/70"
          >
            <Link href="/products?category=new">신상품 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

