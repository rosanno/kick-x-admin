import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const {
      name,
      description,
      categoryId,
      brandId,
      gender,
      sizes,
      images,
      price,
      discount,
      isFeatured,
      color_name,
      color_value,
    } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    const color = await prisma.color.create({
      data: {
        color_name,
        color_value,
      },
    });

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        brandId,
        colorId: color.id,
        gender,
        price,
        discount,
        isFeatured,
        sizes: {
          createMany: {
            data: [
              ...sizes.map(
                (size: {
                  size: number;
                  initialStock: number;
                }) => ({
                  size: size.size,
                  stock: size.initialStock,
                })
              ),
            ],
          },
        },
        images: {
          createMany: {
            data: [
              ...images.map(
                (image: { image_path: string }) => image
              ),
            ],
          },
        },
      },
    });

    return NextResponse.json({ product });
  } catch (error: any) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
