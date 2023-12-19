import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const customer = await prisma.customer.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!customer?.email) {
      return NextResponse.json({
        message: "Invalid email address",
      });
    }

    if (!customer?.password) {
      return NextResponse.json({
        message: "Wrong password",
      });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.log("[CUSTOMERS_POS]", error);
  }
}
