import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      birthday,
      address,
      email,
      phoneNumber,
      password,
    } = (await req.json()) as {
      firstName: string;
      lastName: string;
      birthday: string;
      address: string;
      email: string;
      phoneNumber: string;
      password: string;
    };

    const hash_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthday,
        address,
        email,
        phoneNumber,
        password: hash_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      })
    );
  }
}
