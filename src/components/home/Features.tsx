import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Truck } from 'lucide-react'

const features = [
  {
    icon: <MapPin className="w-8 h-8 text-orange-500" />,
    title: "Wide Coverage Map",
    description: "Delivering to multiple locations across the city",
  },
  {
    icon: <Clock className="w-8 h-8 text-orange-500" />,
    title: "Fast Delivery",
    description: "Hot food delivered to your doorstep",
  },
  {
    icon: <Truck className="w-8 h-8 text-orange-500" />,
    title: "Live Tracking",
    description: "Real-time tracking of your food delivery",
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

