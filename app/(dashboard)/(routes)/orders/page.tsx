import { format } from "date-fns";
import {
  Briefcase,
  LineChart,
  ShieldOff,
  ShoppingBag,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import { DataCard } from "@/components/ui/data-card";
import { OrderChart } from "./_components/order-chart";
import { Client } from "./_components/client";
import { OrderColumn } from "./_components/column";

export const metadata = {
  title: "Kick X | Orders",
  openGraph: {
    title: "Orders",
    description: "Manage shoe orders",
  },
};

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      orderItems: true,
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    (item) => ({
      id: item.id,
      order_id: item.orderId,
      customer: item.customer.name,
      amount: item.amount,
      delivery_status: "pickups",
      order_date: format(item.createdAt, "d MMMM, yyyy"),
      product: item.orderItems,
    })
  );

  return (
    <>
      <section className="flex gap-5">
        <article className="flex-1">
          <OrderChart />
        </article>
        <article className="grid grid-cols-2 gap-4">
          <DataCard
            data={950}
            label="Total Sales"
            icon={Briefcase}
            color="#000000"
          />
          <DataCard
            data={950}
            label="Sales Projection"
            icon={LineChart}
            color="#FF76A2"
          />
          <DataCard
            data={120}
            label="Total Orders"
            icon={ShoppingBag}
            color="#fbcc76"
          />
          <DataCard
            data={27}
            label="Cancelled"
            icon={ShieldOff}
            color="#1DA91A"
          />
        </article>
      </section>
      <Client orders={formattedOrders} />
    </>
  );
};

export default OrdersPage;
