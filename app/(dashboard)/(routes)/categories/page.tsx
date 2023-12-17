import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import { Client } from "./_components/client";

export const metadata: Metadata = {
  title: "Kick X | Categories",
  description: "Manage shoe categories",
};

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <section>
        <div className="bg-white shadow-sm rounded-sm">
          <Client categories={categories} />
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
