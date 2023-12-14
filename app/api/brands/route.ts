import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany();

    return NextResponse.json(brands);
  } catch (error) {
    console.log("[BRAND_GET]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { brand_name, brand_logo } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    const brand = await prisma.brand.create({
      data: {
        brand_name,
        brand_logo,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
