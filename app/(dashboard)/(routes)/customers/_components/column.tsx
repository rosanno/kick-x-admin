"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { CellAction } from "./cell-action";

export type CustomerColumn = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  created_at: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "customer",
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
          Customer
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("customer")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("phone")}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Joining Date",
    cell: ({ row }) => {
      return (
        <div className="text-[13px]">
          {row.getValue("created_at")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
