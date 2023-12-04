"use client";

import { Order } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./column";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientProps {
  orders: OrderColumn[];
}

export const Client = ({ orders }: ClientProps) => {
  return (
    <section>
      <Card className="border-none shadow-none rounded-sm my-8">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <div className="border-b border-dashed" />
        <CardContent className="px-0">
          <DataTable
            data={orders}
            columns={columns}
            searchKey="customer"
          />
        </CardContent>
      </Card>
    </section>
  );
};
