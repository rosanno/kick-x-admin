import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { brandId: string };
  }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Unauthenticated", {
      status: 403,
    });
  }

  if (!params.brandId) {
    return new NextResponse("Invalid id", {
      status: 403,
    });
  }

  const brand = await prisma.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });

  return NextResponse.json(brand);
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { brandId: string };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    const { brand_name } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.brandId) {
      return new NextResponse("Invalid id", {
        status: 403,
      });
    }

    const brand = await prisma.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        brand_name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { brandId: string };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.brandId) {
      return new NextResponse("Invalid id", {
        status: 403,
      });
    }

    const brand = await prisma.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
