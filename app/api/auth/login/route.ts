import db from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      throw new Error("Please provide the credencials");
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
      const isPasswordcorrect = bcrypt.compare(password, user.password);
      if (!isPasswordcorrect) {
        throw new Error("Password is incorrect.");
      }
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not available.");
      }
      const token = jwt.sign(user.id, process.env.JWT_SECRET);
      const response = NextResponse.json({
        message: "user logined successfully.",
      });
      response.cookies.set("BearerToken", token);
      return response;
    } catch (error) {
      throw new Error("problem in finding user in db.");
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
