import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const categories = [
  { name: "Pizza", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-1.png" },
  { name: "Burgers", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-2.png" },
  { name: "Sushi", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-3.png" },
  { name: "Chinese", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-4.png" },
  { name: "Italian", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-5.png" },
  { name: "Mexican", image: "https://angular.pixelstrap.net/zomo/assets/images/product/p-6.png" },
]

export default function Categories() {
  return (
    <section className="relative">
      <Image
              src={"https://angular.pixelstrap.net/zomo/assets/images/popcorn.png"}
              alt={`logo`}
                    width={180}
                    height={180}
              className="absolute -bottom-2 object-cover "
            />
      <div className="container mx-auto px-4 bg-white py-6 rounded-xl shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="bg-slate-50 transition duration-250 ease-in-out hover:text-amber-600 hover:-translate-y-1 hover:scale-105 hover:bg-[#fef8f0] cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-xl">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

