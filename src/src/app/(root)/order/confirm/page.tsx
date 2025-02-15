"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import CheckoutProgress from "@/components/order/checkout-progress";
import Cart_session from "@/components/order/cart_session";

export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    // Show success dialog after a short delay
    const timer = setTimeout(() => {
        handleClose()
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Progress Tracker */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-6 grid-cols-6 gap-8">
          {/* Addresses Section */}
          <div className="col-span-4">
            <div className="bg-white shadow-md p-6 mb-8">
              <CheckoutProgress currentStep={3} />
            </div>
            <div className="bg-white shadow-md p-6 text-center">
              <div className="mx-auto w-28 h-28 rounded-full flex items-center  justify-center mb-4">
                <Image
                  src="https://angular.pixelstrap.net/zomo/assets/images/gif/confirm.gif"
                  alt="confirm"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="text-2xl  font-bold mb-6">Đặt hàng thành công!</h1>
              <p className="text-gray-500">
                Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn sẽ được giao trong thời
                gian sớm nhất.
              </p>
              <div className="mt-10">
                <Button
                  onClick={handleClose}
                  className="w-50 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>
     
          </div>

          <Cart_session />
        </div>
      </div>
    </div>
  );
}
