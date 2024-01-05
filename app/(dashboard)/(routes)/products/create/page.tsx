import { prisma } from "@/lib/prisma";

import { ProductForm } from "@/components/product-form";

const CreateProductPage = async () => {
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();

  return (
    <div>
      <ProductForm
        categories={categories}
        brands={brands}
      />
    </div>
  );
};

export default CreateProductPage;
