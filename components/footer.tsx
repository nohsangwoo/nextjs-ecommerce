import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 flex flex-col md:flex-row justify-between">
        <div className="space-y-4 mb-8 md:mb-0">
          <h2 className="text-xl font-bold">ASOS Style</h2>
          <p className="text-muted-foreground max-w-xs">
            최신 트렌드의 패션 아이템을 만나보세요. 당신의 스타일을 완성시켜 드립니다.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Facebook
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">쇼핑하기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  모든 상품
                </Link>
              </li>
              <li>
                <Link href="/products?category=new" className="text-muted-foreground hover:text-foreground">
                  신상품
                </Link>
              </li>
              <li>
                <Link href="/products?category=sale" className="text-muted-foreground hover:text-foreground">
                  세일
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  배송 정보
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  교환 및 반품
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">회사 정보</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  채용 정보
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t py-6">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ASOS Style. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              이용약관
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

