import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", {
        status: 403,
      });
    }

    const schema = z.object({
      firstName: z.string().regex(/^[a-zA-Z]+$/), // Must contain only letters
      lastName: z.string().regex(/^[a-zA-Z]+$/), // Must contain only letters,
      email: z.string().email(),
      image_url: z.string().optional(),
      phoneNumber: z.string(),
      address: z.string(),
      password: z
        .string()
        .min(8)
        .max(32)
        .trim()
        .regex(/[a-zA-Z]+/) // Must contain at least one letter
        .regex(/[0-9]+/) // Must contain at least one digit
        .regex(/[\W]+/) // Must contain at least one special character
        .optional(),
      role: z.enum(["USER", "ADMIN"]),
    });

    const response = schema.safeParse(await req.json());

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({
        error: { message: "Invalid request", errors },
      }, {
        status: 400
      });
    }

    const {
      firstName,
      lastName,
      email,
      image_url,
      phoneNumber,
      address,
      password,
      role,
    } = response.data;

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        firstName,
        lastName,
        email,
        photo_url: image_url,
        phoneNumber,
        address,
        password,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
