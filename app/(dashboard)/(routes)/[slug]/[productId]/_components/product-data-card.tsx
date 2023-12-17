"use client";

import { formatter } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProductDataCard {
  data: number | undefined | string | boolean;
  icon: LucideIcon;
  label: string;
}

export const ProductDataCard = ({
  data,
  icon: Icon,
  label,
}: ProductDataCard) => {
  return (
    <div
      className="
         border
         border-dashed
         rounded-sm
         flex
         items-center
         gap-4
         w-[160px]
         px-5
         py-3
        "
    >
      <Icon className="text-[#313131]" />
      <div>
        <h2 className="text-[13px] text-muted-foreground">
          {label}
        </h2>
        <h3 className="text-sm pt-1">
          {data}
        </h3>
      </div>
    </div>
  );
};
