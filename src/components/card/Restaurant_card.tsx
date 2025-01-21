import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Percent  } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisineTypes: string[];
  rating: number;
  location: string;
  distance: string;
  estimatedTime: string;
  promotion: {
    title: string;
    discount: string;
  };
  category: string;
}

export default function RestaurantCard({
  id,
  name,
  image,
  cuisineTypes,
  rating,
  location,
  distance,
  estimatedTime,
  promotion,
  category,
}: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow p-4">
        <CardHeader className="p-0 mb-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
             {promotion&&<div className="absolute top-3 left-3">
              <Badge variant="destructive" className="flex items-center gap-1">
                <Percent className="h-3 w-3" />
                {promotion.discount}
              </Badge>
            </div>}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className=" text-lg">{name}</h3>
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 fill-current " />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-3">
            {cuisineTypes.join(", ")}
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-[16px] w-[16px]" />
              <span>{location}</span>
            </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground justify-between mb-3">
           
            <div className="flex items-center gap-1 text-sm text-muted-foreground ">
              <Clock className="h-[16px] w-[16px]" />
              <span>{estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge className="ml-1 text-sm bg-orange-500 hover:bg-orange-500">{distance}</Badge>
            </div>
          </div>

          {promotion && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium text-orange-500">
                {promotion.title}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
