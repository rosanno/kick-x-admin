"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Joining Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
