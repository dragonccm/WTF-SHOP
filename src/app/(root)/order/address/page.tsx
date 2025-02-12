"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Building2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddAddressDialog from "@/components/order/add-address-dialog";
import CheckoutProgress from '@/components/order/checkout-progress'
import Cart_session from '@/components/order/cart_session'


interface Address {
  id: string;
  type: "home" | "office";
  name: string;
  address: string;
  phone: string;
}

export default function AddressPage() {
  const [addresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "Home",
      address: "93, Songbird Cir, Blackville, South Carolina, USA-29817",
      phone: "+33 (907) 555-0101",
    },
    {
      id: "2",
      type: "office",
      name: "Office",
      address: "703 Elizabeth Barcus Way, USA-95540",
      phone: "+33 (907) 555-3456",
      },
      {
        id: "3",
        type: "office",
        name: "Office",
        address: "703 Elizabeth Barcus Way, USA-95540",
        phone: "+33 (907) 555-3456",
      },
  ]);



  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const router = useRouter();

 
  return (
    <div className="min-h-screen box-bg mt-16">
      {/* Progress Tracker */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-6 grid-cols-6 gap-8">
          {/* Addresses Section */}
          <div className="col-span-4">
            <div className="bg-cate shadow-md p-6 mb-8">
              {/* <div className="flex justify-between items-center max-w-3xl mx-auto ">
                <div className="flex-1 flex items-center">
                  <div className="relative flex jussify-center flex-col items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm mt-2">Account</div>
                  </div>
                  <div className="flex-1 h-px border-t-2 border-dotted border-orange-500"></div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="relative flex jussify-center flex-col items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm mt-2">Address</div>
                  </div>
                  <div className="flex-1 h-px border-t-2 border-dotted border-gray-300"></div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="relative flex jussify-center flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-sm mt-2">Payment</div>
                  </div>
                  <div className="flex-1 h-px border-t-2 border-dotted border-gray-300"></div>
                </div>
                <div className="flex items-center">
                  <div className="relative flex jussify-center flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-sm mt-2">Confirm</div>
                  </div>
                </div>
              </div> */}
               <CheckoutProgress currentStep={1}/>
            </div>
            <div className="bg-cate shadow-md p-6 ">
              <h2 className="text-xl font-semibold mb-4">
                Select Saved Address
              </h2>
              <p className="text-gray-500 mb-6">
                You've add some address before, You can select one of below.
              </p>

              <div className=" grid md:grid-cols-2 grid-cols-1 gap-4">
                {addresses.map((address) => (
                  <Card
                    key={address.id}
                    className={`rounded-md cursor-pointer transition-shadow hover:shadow-md ${
                      selectedAddress === address.id
                        ? "ring-2 ring-orange-500"
                        : ""
                    }`}
                        onClick={() => setSelectedAddress(address.id)}>
                        
                    <CardContent className="p-0">
                      <div className="flex justify-between items-center mb-2 border-b border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                          {address.type === "home" ? (
                            <Home className="w-5 h-5 text-orange-500" />
                          ) : (
                            <Building2 className="w-5 h-5 text-orange-500" />
                          )}
                          <span className="font-medium text-orange-500">{address.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-orange-500 h-auto p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit
                          }}>
                          Edit
                        </Button>
                      </div>
                            <div className="p-3">
                            <p className="text-1 mb-2">{address.address}</p>
                                <p className="text-2 mb-2">{address.phone}</p>
                                <hr />
                      <Button
                        variant="secondary"
                        className="mt-3 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAddress(address.id);
                        }}>
                        Deliver Here
                      </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                 <Button
                onClick={() => setIsAddingAddress(true)}
                  variant="outline"
                   className="rounded-md cursor-pointer text-1 border-orange-500 h-100 transition-shadow hover:shadow-md hover:bg-gray hover:text-orange-500"
                  // className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
              </div>

             
              <Button
                onClick={() => router.push("/order/payment")}
                disabled={!selectedAddress }
                className="w-full mt-10 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                Tiếp tục
              </Button>
            </div>
          </div>

          {/* Cart Section */}
          <Cart_session/>
        </div>
      </div>

      <AddAddressDialog
        open={isAddingAddress}
        onOpenChange={setIsAddingAddress}
      />
    </div>
  );
}
