import { useUser } from "@/store/userstore"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
const getsetuser =async()=>{
    const cookieStore = await cookies()
    const token = cookieStore.get('BeareToken')?.value as string
    const state = useUser((state)=>state)

 if (token) {
       try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET);
         const { payload } = await jwtVerify(token, secret);
   
         if (typeof payload !== 'object' || payload === null) {
           throw new Error("Invalid JWT payload");
         }
   
         if (payload && payload.id) {
           await state.setUserById(String(payload.id) );
         }
       } catch (error) {
         console.error("JWT verification failed:", error);
       }
     }
  
}
export default getsetuser