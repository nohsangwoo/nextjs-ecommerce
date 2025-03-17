import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "men",
    name: "남성",
    image: "/category/men.webp",
  },
  {
    id: "women",
    name: "여성",
    image: "/category/women.webp",
  },
  {
    id: "accessories",
    name: "액세서리",
    image: "/category/accessories.webp",
  },
  {
    id: "shoes",
    name: "신발",
    image: "/category/shoes.webp",
  },
]

export function PopularCategories() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">카테고리</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square relative">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

