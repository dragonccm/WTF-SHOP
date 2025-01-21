"use client";

import { useState } from "react";
import { Tag, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Voucher {
  id: string;
  code: string;
  description: string;
}

const vouchers: Voucher[] = [
  {
    id: "1",
    code: "TETCC2025",
    description: "Lễ hội Ẩm thực Coca-Cola đồng hành cùng ShopeeFood Tết 2025",
  },
  {
    id: "2",
    code: "TETCC2025B",
    description: "Lễ hội Ẩm thực Coca-Cola đồng hành cùng ShopeeFood Tết 2025",
  },
  {
    id: "3",
    code: "TETCC2025C",
    description: "Lễ hội Ẩm thực Coca-Cola đồng hành cùng ShopeeFood Tết 2025",
  },
  {
    id: "4",
    code: "VIB30K",
    description: "VIB giảm 30k",
  },
  {
    id: "5",
    code: "HOME150K",
    description: "HOME CREDIT giảm 40k cho đơn hàng từ 150k",
  },
  {
    id: "6",
    code: "HOME100K",
    description: "HOME CREDIT giảm 50k cho đơn từ 100k",
  },
  {
    id: "7",
    code: "GIAMGIA",
    description: "Giảm giá một số món ăn trên menu",
  },
];

export default function VoucherList() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-2 bg-white rounded-lg mb-5">
      {vouchers.map((voucher) => (
        <div
          key={voucher.id}
          className="flex items-center justify-between gap-4 p-3  bg-[#fbf9d8] border border-dashed border-black rounded-lg hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-3">
            <div>
              <Tag className="h-[30px] w-[30px] text-orange-500" />
            </div>
            <span className="text-sm font-medium">{voucher.description}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm hover:bg-transparent hover:text-orange-500"
                  onClick={() => copyToClipboard(voucher.code, voucher.id)}>
                  {copiedStates[voucher.id] ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy code
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{voucher.code}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
}
