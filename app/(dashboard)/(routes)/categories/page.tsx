import { prisma } from "@/lib/prisma";

import { Client } from "./_components/client";

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
