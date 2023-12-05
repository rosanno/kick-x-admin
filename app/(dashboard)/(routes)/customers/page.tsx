import { prisma } from "@/lib/prisma";

const CustomersPage = async () => {
  const customers = await prisma.customer.findMany();

  return <div>Customer Pages</div>;
};

export default CustomersPage;
