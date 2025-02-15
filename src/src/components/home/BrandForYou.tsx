"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
      // ...
    </Carousel>
  );
}

export default function BrandForYou() {
  const brands = [
    {
      name: "Subway",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand6.png",
      href: "/brand/subway",
    },
    {
      name: "Domino's",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand1.png",
      href: "/brand/dominos",
    },
    {
      name: "Taco Bell",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand2.png",
      href: "/brand/taco-bell",
    },
    {
      name: "Chipotle",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand3.png",
      href: "/brand/chipotle",
    },
    {
      name: "KFC",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand4.png",
      href: "/brand/kfc",
    },
    {
      name: "La Pino'z",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand5.png",
      href: "/brand/la-pinoz",
    },
    {
      name: "Mc'd",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand7.png",
      href: "/brand/mcdonalds",
    },
    {
      name: "Starbucks",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand8.png",
      href: "/brand/starbucks",
    },
    {
      name: "Starbucks",
      logo: "https://angular.pixelstrap.net/zomo/assets/images/icons/brand9.png",
      href: "/brand/starbucks",
    },
  ];
  return (
    <section className="relative py-12">
      <Image
        src={"https://angular.pixelstrap.net/zomo/assets/images/svg/item4.svg"}
        alt={`logo`}
        width={180}
        height={100}
        className="absolute -bottom-2 object-cover "
      />
      <div className="container mx-auto">
        <div className="h-0.5 w-20 mt-8 mb-2 bg-slate-100 overflow-hidden">
          <div className="animate-progress w-full h-full bg-orange-500 origin-left-right"></div>
        </div>
        <h2 className="text-3xl font-bold  font-black">Brand For You</h2>
        <h5 className="mb-8 text-lg text-gray-500 ">
          Browse out top brands here to discover different food cuision.
        </h5>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            {brands.map((brand) => (
              <CarouselItem className="pl-1 md:basis-1/4 lg:basis-1/6">
                <Link
                  key={brand.name}
                  href={brand.href}
                  className="flex flex-col px-2 items-center gap-3 min-w-[120px] border-l snap-start hover:text-orange-500">
                  <div className="w-[100px] h-[100px] rounded-full hover:shadow-lg transition-shadow">
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-base font-semibold text-center">
                    {brand.name}
                  </span>
                </Link>
              </CarouselItem>
            ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
