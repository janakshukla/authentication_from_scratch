import { cookies } from "next/headers";
import { useUser } from "@/store/userstore";
import * as jwt from "jsonwebtoken";

import db from "../lib/prisma";

async function getsetuser() {
  const state = useUser.getState();
  if (!state.user) {
    try {
      const cookiestore = await cookies();
      const token = cookiestore.get("BearerToken")?.value;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (
          typeof decoded === "object" &&
          decoded !== null &&
          "id" in decoded
        ) {
          const user = await db.user.findUnique({
            where: {
              id: String(decoded),
            },
          });
          if (user) {
            state.setuserbyid(user);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default getsetuser;
