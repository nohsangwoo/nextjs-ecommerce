import { Banner } from "@/components/home/banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewArrivals } from "@/components/home/new-arrivals"
import { PopularCategories } from "@/components/home/popular-categories"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Banner />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <PopularCategories />
        <FeaturedProducts />
        <NewArrivals />
      </div>
    </main>
  )
}

