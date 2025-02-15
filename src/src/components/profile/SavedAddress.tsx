import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const addresses = [
    {
        id: 1,
        label: "Home",
        icon: "🏠",
        address: "93, Songbird Cir, Blackville, South Carolina, USA-29817",
        phone: "+33 (907) 555-0101",
    },
    {
        id: 2,
        label: "Office",
        icon: "🏢",
        address: "703 Elizabeth Barcus Way, USA-95540",
        phone: "+33 (907) 555-3456",
    },
    {
        id: 3,
        label: "Smith Jones",
        icon: "👤",
        address: "13th Street 47 W 13th St, New York, USA-10011",
        phone: "+33 (907) 555-1235",
    },
];

const SavedAddress = () => {
    return (
        <Card>
            <div className="w-full mx-auto p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Saved Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl">{address.icon}</span>
                                <h3 className="text-lg font-semibold text-orange-600">{address.label}</h3>
                            </div>
                            <p className="text-gray-600 mt-2">{address.address}</p>
                            <p className="text-gray-500 mt-1">{address.phone}</p>
                            <Button
                                variant="default"
                                className="mt-4 bg-orange-100 text-orange-600 hover:bg-orange-200 px-4 py-2 text-sm"
                            >
                                Edit
                            </Button>
                        </div>
                    ))}
                    <div className="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg p-4">
                        <Button variant="default" className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2">
                            Add New Address
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SavedAddress;
