import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { categoryId: string };
  }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Unauthenticated", {
      status: 403,
    });
  }

  if (!params.categoryId) {
    return new NextResponse("Invalid id", {
      status: 403,
    });
  }

  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return NextResponse.json(category);
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: { categoryId: string };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    const { category_name } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("Invalid id", {
        status: 403,
      });
    }

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        category_name,
      },
    });

    return NextResponse.json(category);
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
    params: { categoryId: string };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    if (!params.categoryId) {
      return new NextResponse("Invalid id", {
        status: 403,
      });
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
