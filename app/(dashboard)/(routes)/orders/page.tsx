import { format } from "date-fns";
import {
  Briefcase,
  LineChart,
  ShieldOff,
  ShoppingBag,
} from "lucide-react";

import { DataCard } from "@/components/ui/data-card";
import { OrderChart } from "./_components/order-chart";
import { prisma } from "@/lib/prisma";
import { Client } from "./_components/client";
import { OrderColumn } from "./_components/column";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: true,
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    (item) => ({
      id: item.id,
      order_id: item.orderId,
      customer:
        item?.user[0].firstName +
        " " +
        item?.user[0].lastName,
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
          />
          <DataCard
            data={950}
            label="Sales Projection"
            icon={LineChart}
          />
          <DataCard
            data={120}
            label="Total Orders"
            icon={ShoppingBag}
          />
          <DataCard
            data={27}
            label="Cancelled"
            icon={ShieldOff}
          />
        </article>
      </section>
      <Client orders={formattedOrders} />
    </>
  );
};

export default OrdersPage;
