import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { useUser } from "./store/userstore";

export async function middleware(req: NextRequest) {
    const state = useUser.getState();
    const token = req.cookies.get("BearerToken")?.value;
  
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
  
        if (typeof payload !== 'object' || payload === null) {
          throw new Error("Invalid JWT payload");
        }
  
        if (payload && payload.id) {
          await state.setUserById(String(payload.id) );
          return NextResponse.next();
        }
      } catch (error) {
        console.error("JWT verification failed:", error);
      }
    }
  
    return NextResponse.redirect(new URL("/login", req.url));
  }

export const config = {
  matcher: ["/"], // Add your protected routes here
};