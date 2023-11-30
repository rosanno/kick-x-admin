import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
        status: 400,
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        brand: true,
        sizes: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const session = await getServerSession(authOptions);

  const {
    name,
    description,
    categoryId,
    brandId,
    isFeatured,
    gender,
    sizes,
    images,
    price,
    discount,
  } = await req.json();

  if (!session?.user?.id) {
    return new NextResponse("Unauthenticated", {
      status: 403,
    });
  }

  if (!params.productId) {
    return new NextResponse("Product id is required", {
      status: 400,
    });
  }

  await prisma.product.update({
    where: {
      id: params.productId,
    },
    data: {
      name,
      description,
      categoryId,
      brandId,
      isFeatured,
      gender,
      sizes: {
        deleteMany: {},
      },
      images: {
        deleteMany: {},
      },
      price,
      discount,
    },
  });

  const product = await prisma.product.update({
    where: {
      id: params.productId,
    },
    data: {
      sizes: {
        createMany: {
          data: [
            ...sizes.map((size: { size: number }) => size),
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

  return NextResponse.json(product);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", {
        status: 400,
      });
    }

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
