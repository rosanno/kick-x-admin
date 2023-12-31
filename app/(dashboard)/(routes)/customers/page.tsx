import { format } from "date-fns";
import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import { Client } from "./_components/client";
import { CustomerColumn } from "./_components/column";

export const metadata: Metadata = {
  title: "Kick X | Customers",
  description: "Manage customers",
};

const CustomersPage = async () => {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomer: CustomerColumn[] = customers.map(
    (item) => ({
      id: item.id,
      customer: item.name,
      email: item.email,
      phone: item.phoneNumber,
      created_at: format(item.createdAt, "d MMMM, yyyy"),
    })
  );

  return (
    <div>
      <section>
        <div className="bg-white shadow-sm rounded-sm">
          <Client customers={formattedCustomer} />
        </div>
      </section>
    </div>
  );
};

export default CustomersPage;
