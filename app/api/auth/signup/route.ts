import * as jwt from "jsonwebtoken";
import db from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message: "Please provide all crediatials.",
        },
        { status: 500 }
      );
    }
    const hashpassword = await bcrypt.hash(password, 10);
    try {
      const user = await db.user.create({
        data: {
          username,
          password: hashpassword,
          email,
        },
      });
      if (!process.env.JWT_SECRET) {
        throw new Error("jwt secret not found");
      }
      const token = jwt.sign(user.id, process.env.JWT_SECRET);
      const response = NextResponse.json({
        message: "user created sucessfully",
      });
      response.cookies.set("BearerToken", token);

      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          Error: "while creating the user.",
        },
        { status: 402 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: "Error Occured while intial state in route.",
    });
  }
}
