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
      picture,
      gender,
      phoneNumber,
      password,
    } = await req.json();

    const checkUser = await prisma.customer.findUnique({
      where: { email },
    });

    if (checkUser)
      return Response.json(
        { message: "Email already registered" },
        { status: 409 }
      );

    const hash_password =
      password && (await hash(password, 12));

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        birthday,
        address,
        picture,
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
