import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
    id: string
    restaurant: string
    logo: string
    amount: number
    time: string
    transactionId: string
}

const orders: Order[] = [
    {
        id: "1",
        restaurant: "Mcdonald's",
        logo: "https://e7.pngegg.com/pngimages/676/74/png-clipart-fast-food-mcdonald-s-logo-golden-arches-restaurant-mcdonalds-mcdonald-s-logo-miscellaneous-food-thumbnail.png",
        amount: 220,
        time: "05:00 PM",
        transactionId: "ACB12345458"
    },
    {
        id: "2",
        restaurant: "Starbucks",
        logo: "https://banner2.cleanpng.com/20180203/qww/av2kb9j4d.webp",
        amount: 220,
        time: "05:00 PM",
        transactionId: "ACB12345459"
    },
    {
        id: "3",
        restaurant: "Pizza Hut",
        logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/d/d2/Pizza_Hut_logo.svg/2177px-Pizza_Hut_logo.svg.png",
        amount: 90,
        time: "05:00 PM",
        transactionId: "ACB12345678"
    }
]

const MyOrder = () => {
    return (
        <Card>
            <div className=" mx-auto p-4 space-y-4">
                <h1 className="text-2xl font-semibold mb-6">My Order</h1>
                {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={order.logo || "/placeholder.svg"}
                                        alt={`${order.restaurant} logo`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">{order.restaurant}</h2>
                                    <p className="text-sm text-gray-500">
                                        Transaction Id : #{order.transactionId}
                                    </p>
                                </div>
                            </div>
                            <span className="text-gray-600">{order.time}</span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <p className="text-gray-600">
                                Total Amount : <span className="font-semibold">${order.amount}</span>
                            </p>
                            <Button
                                variant="outline"
                                className="text-orange-500 border-orange-500 hover:bg-orange-50"
                            >
                                Details
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export default MyOrder;
