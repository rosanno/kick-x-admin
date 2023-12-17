import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";
import { useState } from "react";

interface ProductDescriptionProps {
  color: Color | undefined;
  category: string | undefined;
  brand: string | undefined;
  description: string | undefined;
  name: string | undefined;
}

export const ProductDescription = ({
  color,
  category,
  brand,
  description,
  name,
}: ProductDescriptionProps) => {
  const [activeTab, setActiveTab] =
    useState("specification");

  return (
    <div className="pt-10">
      <h3 className="text-sm font-medium">
        Product Description:
      </h3>
      <div>
        <div className="flex items-center gap-1.5 mt-4">
          <div
            role="button"
            className={cn(
              "px-5 pb-2.5",
              activeTab === "specification" &&
                "border-b border-b-[#313131] transition duration-300"
            )}
            onClick={() => setActiveTab("specification")}
          >
            <span className="text-[13px] text-[#313131] font-semibold">
              Specification
            </span>
          </div>
          <div
            role="button"
            className={cn(
              "px-5 pb-2.5",
              activeTab === "details" &&
                "border-b border-b-[#313131] transition duration-300"
            )}
            onClick={() => setActiveTab("details")}
          >
            <span className="text-[13px] text-[#313131] font-semibold">
              Details
            </span>
          </div>
        </div>
        <div className="border border-gray-200/60 p-4 h-full">
          {activeTab === "specification" && (
            <SpecificationTab
              category={category!!}
              brand={brand!!}
              colorName={color?.color_name!!}
              colorValue={color?.color_value!!}
            />
          )}
          {activeTab === "details" && (
            <DetailsTab
              description={description!!}
              name={name!!}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SpecificationTab = ({
  category,
  brand,
  colorName,
  colorValue,
}: {
  category: string;
  brand: string;
  colorName: string;
  colorValue: string;
}) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className="thead text-black">
            Category
          </TableHead>
          <TableCell className="text-[13px]">
            {category}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="thead text-black">
            Brand
          </TableHead>
          <TableCell className="text-[13px]">
            {brand}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="thead text-black">
            Color
          </TableHead>
          <TableCell className="text-[13px] flex items-center gap-2">
            <div className="p-1.5 border-2 border-gray-100/70 rounded-full">
              <div
                className="border p-2 shadow-lg w-fit rounded-full"
                style={{
                  backgroundColor: `${colorValue}`,
                }}
              />
            </div>
            {colorName}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const DetailsTab = ({
  description,
  name,
}: {
  description: string;
  name: string;
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium">{name}</h2>
      <p className="text-[13px] leading-5">{description}</p>
    </div>
  );
};
