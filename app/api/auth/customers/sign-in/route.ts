import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer?.email) {
      return NextResponse.json({
        message: "Invalid email address",
      });
    }

    if (!(await compare(password, customer.password))) {
      return NextResponse.json({
        message: "Wrong password",
      });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.log("[CUSTOMERS_POS]", error);
  }
}
