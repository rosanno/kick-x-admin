"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

import { CellAction } from "./cell-action";

export type CategoryColumn = {
  id: string;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <div
          role="button"
          className="flex items-center w-fit"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Name
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("category_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const formattedDate = format(
        row.getValue("createdAt"),
        "dd MMM, yyyy"
      );

      return (
        <div className="text-[13px]">{formattedDate}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => {
      const formattedDate = format(
        row.getValue("createdAt"),
        "dd MMM, yyyy"
      );

      return (
        <div className="text-[13px]">{formattedDate}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
