import db from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json("Please provide the credencials");
    }
    try {
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return NextResponse.json({
          message: "User account doesnot exist.",
        });
      }
      const isPasswordcorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordcorrect) {
        return NextResponse.json("Password is incorrect.");
      }
      if (!process.env.JWT_SECRET) {
        return NextResponse.json("JWT secret is not available.");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const response = NextResponse.json({
        message: "user logined successfully.",
        user
      });
      response.cookies.set("BearerToken", token);
      return response;
    } catch (error) {
      return NextResponse.json("problem in finding user in db.");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 502 }
    );
  }
}
