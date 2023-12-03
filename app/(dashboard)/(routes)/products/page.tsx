import { format } from "date-fns";
import { Folder, LayoutGrid } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { DataCard } from "@/components/ui/data-card";
import { DataTable } from "./_components/data-table";
import {
  ProductColumn,
  columns,
} from "./_components/column";
import { formatter } from "@/lib/utils";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
      category: true,
      brand: true,
    },
  });

  const formattedProducts: ProductColumn[] = products.map(
    (item) => ({
      id: item.id,
      name: item.name,
      image_path: item.images[0].image_path,
      stocks: item.stocks,
      category_name: item.category?.category_name,
      brand_name: item.brand?.brand_name,
      createdAt: format(item.createdAt, "d MMMM, yyyy"),
      price: formatter.format(item.price),
      slug: item.slug,
    })
  );

  return (
    <div className="mt-4 px-2">
      <section>
        <div className="flex items-center gap-7">
          <DataCard
            label="Live Products"
            icon={LayoutGrid}
            data={products.length}
          />
          <DataCard
            label="Low Stock"
            icon={Folder}
            data={146}
          />
        </div>
      </section>
      <section className="mt-7">
        <DataTable
          columns={columns}
          data={formattedProducts}
          productCount={`All Products (${products.length})`}
        />
      </section>
    </div>
  );
};

export default ProductsPage;
