import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/ui/product-form";
import { prisma } from "@/lib/prisma";

const ProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  if (!ObjectId.isValid(params.productId)) {
    notFound();
  }

  const initialData = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      sizes: {
        select: {
          id: true,
          size: true,
          quantity: true,
          productId: true,
        },
        orderBy: {
          size: "asc",
        },
      },
      color: true,
    },
  });

  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();

  return (
    <div>
      <ProductForm
        initialData={initialData}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};

export default ProductPage;
