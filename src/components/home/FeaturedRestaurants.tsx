import RestaurantCard from "@/components/card/Restaurant_card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
const restaurants = [
  {
    id: "mocha-magic",
    name: "Mocha Magic Cafe",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png",
    cuisineTypes: ["Chinese", "Momos", "Dumplings"],
    rating: 3.2,
    location: "Seattle",
    distance: "1 km",
    estimatedTime: "8 min",
    promotion:null,
    category: "food"
  },
  {
    id: "burger-bliss",
    name: "Burger Bliss",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
    cuisineTypes: ["American", "Burgers", "Fast Food"],
    rating: 4.5,
    location: "Seattle",
    distance: "2 km",
    estimatedTime: "15 min",
    promotion:null,
    category: "food"
  },
  {
    id: "sushi-spot",
    name: "Sushi Spot",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    cuisineTypes: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    location: "Seattle",
    distance: "0.5 km",
    estimatedTime: "12 min",
    promotion:null,
    category: "food"
  },
  {
    id: "sushi-spot",
    name: "Sushi Spot",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    cuisineTypes: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    location: "Seattle",
    distance: "0.5 km",
    estimatedTime: "12 min",
    promotion:null,
    category: "food"
  },
  {
    id: "mocha-magic",
    name: "Mocha Magic Cafe",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-12.png",
    cuisineTypes: ["Chinese", "Momos", "Dumplings"],
    rating: 3.2,
    location: "Seattle",
    distance: "1 km",
    estimatedTime: "8 min",
    promotion:null,
    category: "food"
  },
  {
    id: "burger-bliss",
    name: "Burger Bliss",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-11.png",
    cuisineTypes: ["American", "Burgers", "Fast Food"],
    rating: 4.5,
    location: "Seattle",
    distance: "2 km",
    estimatedTime: "15 min",
    promotion:null,
    category: "food"
  },
  {
    id: "sushi-spot",
    name: "Sushi Spot",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    cuisineTypes: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    location: "Seattle",
    distance: "0.5 km",
    estimatedTime: "12 min",
    promotion:null,
    category: "food"
  },
  {
    id: "sushi-spot",
    name: "Sushi Spot",
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/product/vp-10.png",
    cuisineTypes: ["Japanese", "Sushi", "Asian"],
    rating: 4.8,
    location: "Seattle",
    distance: "0.5 km",
    estimatedTime: "12 min",
    promotion:null,
    category: "food"
  },
];

export default function FeaturedRestaurants() {
  return (
    <section className="p-4 bg-gray">
      <div className="mx-auto container">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-0.5 w-20 mt-8 mb-2 bg-slate-100 overflow-hidden">
              <div className="animate-progress w-full h-full bg-orange-500 origin-left-right"></div>
            </div>
            <h2 className="text-3xl mb-8 font-bold  font-black">
              Featured Restaurants
            </h2>
          </div>
          <div>
            <ToggleGroup type="single" defaultValue="bold" >
              <ToggleGroupItem value="bold" aria-label="Toggle bold" aria-checked='true' className="toggle_home text-lg text-gray-500 font-sans">
                Fast Delivery
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic" className="toggle_home text-lg text-gray-500 font-sans">
                Rating
              </ToggleGroupItem>
              <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" className="toggle_home text-lg text-gray-500 font-sans">
                Cost
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}
