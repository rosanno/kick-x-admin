import { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { Client } from "./_components/client";

export const metadata: Metadata = {
  title: "Kick X | Brands",
  description: "Manage shoe brands",
};

const Brands = async () => {
  const brands = await prisma.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white shadow-sm rounded-sm">
      <Client brands={brands} />
    </div>
  );
};

export default Brands;
