import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-300" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">주문이 완료되었습니다!</h1>
        <p className="text-muted-foreground mb-8">
          주문이 성공적으로 처리되었습니다. 주문 확인 이메일이 곧 발송될 예정입니다.
        </p>

        <div className="p-6 border rounded-lg mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">주문번호</span>
            <span>ORD-{Math.floor(Math.random() * 1000000)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">주문일자</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">결제금액</span>
            <span>₩{(Math.floor(Math.random() * 50) * 10000 + 50000).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">주문 내역 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

