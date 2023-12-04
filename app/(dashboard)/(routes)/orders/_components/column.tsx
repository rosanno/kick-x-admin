"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  order_id: string;
  customer: string;
  product: any;
  order_date: string;
  amount: number;
  delivery_status:
    | "cancelled"
    | "delivered"
    | "pickups"
    | "returns";
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "order_date",
    header: "Order ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "delivery_status",
    header: "Delivery Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
