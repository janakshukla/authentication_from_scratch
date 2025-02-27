"use client"
import  React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useUser } from "@/store/userstore";
import { redirect } from "next/navigation";



const page = () => {
 
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const login = useUser((state)=>state.login)
    const handleclick=async()=>{
       const res= await login(email,password)
       console.log(res)
      redirect("/")
    }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-900" >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            already don't have an account
            <Link className="text-blue-600 ml-4 hover:underline " href={"/signup"}> click here </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                
                <Label htmlFor="email"> Email</Label>
                <Input type="email"
                value={email}
                onChange={(e)=>{
                    setemail(e.target.value)
                }}
                id="email" placeholder="Enter youn Email" />
                <Label htmlFor="pass">Password</Label>
                <Input type="password"
                value={password}
                onChange={(e)=>{
                    setpassword(e.target.value)
                }}
                id="pass" placeholder="Enter youn password" />
              </div>
              
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
       
          <Button onClick={handleclick} >Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
