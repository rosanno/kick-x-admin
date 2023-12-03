import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

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

    const slug = slugify(name).toLowerCase();

    const stocks = sizes.reduce(
      (acc: any, current: any) => acc + current.quantity,
      0
    );

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
        slug,
        gender,
        price,
        discount,
        isFeatured,
        stocks,
        sizes: {
          createMany: {
            data: [
              ...sizes.map(
                (size: {
                  size: number;
                  quantity: number;
                }) => ({
                  size: size.size,
                  quantity: size.quantity,
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
