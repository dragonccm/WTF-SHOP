"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CheckoutProgress from "@/components/order/checkout-progress";
import Cart_session from "@/components/order/cart_session";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen box-bg mt-16">
      {/* Progress Tracker */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-6 grid-cols-6 gap-8">
          {/* Addresses Section */}
          <div className="col-span-4">
            <div className="bg-cate shadow-md p-6 mb-8">
              <CheckoutProgress currentStep={2} />
            </div>
            <div className="bg-cate shadow-md p-6 ">
              <h1 className="text-2xl font-bold mb-6">
                Chọn phương thức thanh toán
              </h1>

              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-orange-500" />
                      Thẻ tín dụng/ghi nợ
                    </Label>
                  </div>

                  {paymentMethod === "card" && (
                    <Card className="bg-transparent border-orange-500">
                      <CardContent className="p-4 space-y-4">
                        <Input placeholder="Số thẻ" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVV" />
                        </div>
                        <Input placeholder="Tên chủ thẻ" />
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-orange-500" />
                      Ví MoMo
                    </Label>
                  </div>

                  {paymentMethod === "momo" && (
                    <Card className="bg-transparent shadow-none border-transparent">
                      <CardContent className="p-4 ">
                        <Input placeholder="Số điện thoại MoMo" className="border-gray"/>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </RadioGroup>

              <Button
                onClick={() => router.push("/order/confirm")}
                disabled={!paymentMethod}
                className="w-full mt-10 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                Tiếp tục
              </Button>
            </div>
          </div>

          {/* Cart Section */}
          <Cart_session />
        </div>
      </div>
    </div>
  );
}
