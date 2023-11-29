"use client";

import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import {
  Boxes,
  ClipboardSignature,
  Coins,
  ListChecks,
  Pencil,
  Trash,
} from "lucide-react";
import {
  Brand,
  Category,
  Product,
  Size,
} from "@prisma/client";

import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductDataCard } from "./product-data-card";
import { ProductDescription } from "./product-description";
import { ProductReviews } from "./product-reviews";
import { AlertModal } from "@/components/modals/alert-modal";

interface ProductInformationProps {
  product:
    | (Product & {
        category: Category;
        brand: Brand;
        sizes: Size[];
      })
    | null;
}

export const ProductInformation = ({
  product,
}: ProductInformationProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedPrice =
    product?.price !== undefined &&
    formatter.format(product?.price);
  const formmatedRevenue = formatter.format(60645);

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <article className="col-span-3 relative">
        <div className="space-y-7">
          <div>
            <h1 className="text-xl font-medium leading-none">
              {product?.name}
            </h1>
            <div className="flex items-center gap-10 pt-2">
              <span className="text-[13px] leading-none text-muted-foreground">
                {product?.brand?.brand_name}
              </span>
              <span className="text-[13px] leading-none text-muted-foreground">
                Created:{" "}
                {format(
                  product?.createdAt!!,
                  "d MMM, yyyy"
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <FaStar
                key={index}
                className="h-4 w-4 text-yellow-400"
              />
            ))}
            <span className="text-[13px] text-muted-foreground">
              (5.50k Customer Review)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <ProductDataCard
              label="Price:"
              data={formattedPrice}
              icon={Coins}
            />
            <ProductDataCard
              label="Orders:"
              data={(2234).toLocaleString()}
              icon={Boxes}
            />
            <ProductDataCard
              label="Available Stocks:"
              data={product?.stocks.toLocaleString()}
              icon={ListChecks}
            />
            <ProductDataCard
              label="Total Revenue:"
              data={formmatedRevenue}
              icon={ClipboardSignature}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sizes:</h3>
            <div className="flex items-center gap-2">
              {product?.sizes?.map((size) => (
                <div
                  key={size.id}
                  className="bg-gray-100/70 w-10 h-10 flex items-center justify-center rounded-xl"
                >
                  <span className="text-[13px] font-semibold">
                    {size.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              Description:
            </h3>
            <p className="text-[13px] text-muted-foreground">
              {product?.description}
            </p>
          </div>
          <ProductDescription
            category={product?.category?.category_name}
            brand={product?.brand?.brand_name}
            description={product?.description}
            name={product?.name}
          />
          <ProductReviews />
        </div>
        <div className="absolute top-0 right-0 flex items-center gap-2.5">
          <div>
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => setOpen(true)}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
          <div>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="bg-gray-100/60"
              onClick={() =>
                router.push(`/products/${product?.id}`)
              }
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};
