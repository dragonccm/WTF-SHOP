import RestaurantCard from "@/components/card/Restaurant_card";

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
  },
];

export default function Restaurants() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="h-0.5 w-20 mb-2 bg-slate-100 overflow-hidden">
          <div className="animate-progress w-full h-full bg-orange-500 origin-left-right"></div>
        </div>
        <h2 className="text-3xl font-bold  font-black">
          Popular Restaurants
        </h2>
        <h5 className="mb-8 text-lg text-2">
        Find nearby popular Restaurants.
        </h5>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {restaurants.map((restaurant) => (
                   <RestaurantCard key={restaurant.id} {...restaurant} />
                 ))}
               </div>
      </div>
    </section>
  );
}
