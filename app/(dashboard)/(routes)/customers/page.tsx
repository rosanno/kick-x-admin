import { prisma } from "@/lib/prisma";

import { Client } from "./_components/client";
import { CustomerColumn } from "./_components/column";
import { format } from "date-fns";

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
