import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [
      { category_name: "Sneakers" },
      { category_name: "Basketball shoes" },
      { category_name: "Cleats" },
      { category_name: "Running shoes" },
      { category_name: "Trail running shoes" },
    ],
  });

  await prisma.brand.createMany({
    data: [
      {
        brand_name: "Nike",
      },
      {
        brand_name: "Underarmor",
      },
      {
        brand_name: "Anta",
      },
      {
        brand_name: "Adidas",
      },
      {
        brand_name: "Rebook",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
