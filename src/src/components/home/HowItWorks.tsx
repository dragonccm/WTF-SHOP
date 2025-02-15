import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/banner/banner1.jpg",
    link: "/",
  },
  {
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/banner/banner2.jpg",
    link: "/",
  },
  {
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/banner/banner3.jpg",
    link: "/",
  },
  {
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/banner/banner4.jpg",
    link: "/",
  },
  {
    image:
      "https://angular.pixelstrap.net/zomo/assets/images/banner/banner5.jpg",
    link: "/",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="h-0.5 w-20 mb-2 bg-slate-100 overflow-hidden">
          <div className="animate-progress w-full h-full bg-orange-500 origin-left-right"></div>
        </div>
        <h2 className="text-3xl font-bold  font-black">Today’s Deal</h2>
        <h5 className="mb-8 text-xl text-gray-500">
          {" "}
          Take a benefit from our latest offers.
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center rounded-xl overflow-hidden shadow-md">
              <Link href={step.link}>
                <Image
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  width={500}
                  height={300}
                />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
