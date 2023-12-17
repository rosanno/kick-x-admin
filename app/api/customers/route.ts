import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      birthday,
      address,
      gender,
      phoneNumber,
      password,
    } = await req.json();

    const hash_password = await hash(password, 12);

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        birthday,
        address,
        gender,
        phoneNumber,
        password: hash_password,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[CUSTOMERS_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
