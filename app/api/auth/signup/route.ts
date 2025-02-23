import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password, email } = reqBody;
    if(!username||!email||!password){
      return NextResponse.json({
        "message":"Please provide all crediatials."
      },
    {status:500}
    )
    }

    return NextResponse.json({
      message: "user created sucessfully",
    });
  } catch (error) {
    return NextResponse.json({
      Message: "Error Occured while intial state in route.",
    });
  }
}
