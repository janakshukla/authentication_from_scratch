"use client";
import React, { useState } from "react";

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

export default function signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const signup = useUser((state) => state.signup);
  const handleclick = async () => {
    const res = await signup(username, email, password);

    console.log(res.json());
  };
  return (
    <div className="h-screen flex justify-center items-center bg-slate-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            already have an account
            <Link
              className="text-blue-600 hover:underline ml-4"
              href={"/login"}
            >
              click here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Username"> Username</Label>
                <Input
                  type="Username"
                  id="Username"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  placeholder="Enter youn Username"
                />
                <Label htmlFor="email"> Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  id="email"
                  placeholder="Enter youn Email"
                />
                <Label htmlFor="pass">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  id="pass"
                  placeholder="Enter youn password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleclick}>signup</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
