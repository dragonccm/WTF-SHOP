import Categories from "@/components/home/Categories";
import Restaurants from "@/components/home/Restaurants";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import BrandForYou from "@/components/home/BrandForYou";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-main">
        <div className="h-[500px] relative">
          <div
            className=" flex w-full  min-h-[570px]"
            style={{
              backgroundImage:
                "url('https://angular.pixelstrap.net/zomo/media/bg-SYBVHDZT.jpg')",
              backgroundSize: "inherit",
              backgroundPosition: "center",
            }}>
            <div className="container  mx-auto flex items-center w-svw text-white">
              <div className="px-4 text-center w-7/12">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  Delicious Food Delivered To Your Door
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Choose from thousands of restaurants and get your favorite
                  meals delivered right to your doorstep
                </p>
                <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter your delivery address "
                    className="bg-white text-gray-900 py-6 rounded-2xl"
                  />
                  <Button className="btn_main py-6">
                    <Search className="mr-2 h-12 w-4" />
                    Find Food
                  </Button>
                </div>
              </div>
              <div className="absolute top-12 right-0  min-h-[400px]">
                <Image
                  src="/images/home-vector.png"
                  alt=""
                  width={500}
                  height={500}
                  quality={100}
                  className="w-[550px]"
                />
              </div>
            </div>
          </div>
        </div>
        <Categories />
        <HowItWorks />
        <FeaturedRestaurants />
        <BrandForYou />
        <Restaurants />
        <Features />
      </div>
    </div>
  );
}
