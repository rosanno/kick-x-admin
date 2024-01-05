import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { ProductInformation } from "./_components/product-information";
import { ProductImage } from "./_components/product-image";

const ProductDetailsPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  if (!ObjectId.isValid(params.productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      color: true,
      category: true,
      brand: true,
      images: true,
      sizes: true,
    },
  });

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <section className="grid xl:grid-cols-5 gap-8">
        <ProductImage product={product} />
        <ProductInformation product={product} />
      </section>
    </div>
  );
};

export default ProductDetailsPage;
