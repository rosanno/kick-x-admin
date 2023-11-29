"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaSort } from "react-icons/fa6";
import Image from "next/image";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  image_path: string;
  stocks: number;
  category_name: string | undefined;
  brand_name: string | undefined;
  price: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          role="button"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
          className="flex items-center w-fit"
        >
          <FaSort className="h-3 w-3 mr-1" />
          Product
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div className="bg-gray-100 rounded-sm h-16 w-16 flex items-center justify-center p-1">
            <Image
              src={row.original.image_path}
              alt="Product image"
              width={60}
              height={60}
            />
          </div>
          <div className="text-[13px]">
            {row.getValue("name")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("category_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "stocks",
    header: "Stocks",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("stocks")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created_At",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("createdAt")}
        </div>
      );
    },
  },
  {
    accessorKey: "brand_name",
    header: "Brand",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("brand_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("price")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
