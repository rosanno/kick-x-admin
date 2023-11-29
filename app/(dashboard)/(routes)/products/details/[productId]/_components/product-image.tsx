"use client";

import { useState } from "react";
import Image from "next/image";

import { Image as Img, Product } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ProductInformationProps {
  product:
    | (Product & {
        images: Img[];
      })
    | null;
}

export const ProductImage = ({
  product,
}: ProductInformationProps) => {
  const [index, setIndex] = useState(0);

  return (
    <article className="col-span-2 space-y-2.5">
      <div className="bg-gray-200/30 h-[480px] flex items-center justify-center rounded-sm overflow-hidden">
        <Image
          src={product?.images[index]?.image_path!!}
          alt={product?.name!!}
          width={550}
          height={550}
          className="p-10"
        />
      </div>
      <div className="flex items-center gap-2">
        {product?.images?.map((image, i) => (
          <div
            role="button"
            key={image.id}
            className={cn(
              "h-[75px] border border-gray-200/50 rounded-md flex items-center",
              i === index &&
                "bg-gray-100"
            )}
            onClick={() => setIndex(i)}
          >
            <Image
              src={image.image_path}
              alt={image.image_path}
              width={80}
              height={80}
              className="object-cover p-2.5"
            />
          </div>
        ))}
      </div>
    </article>
  );
};
