"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUser } from "@/store/userstore";
import Link from "next/link";


export default function Home() {
  const user = useUser((state) => state.user);


  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{user ? `Welcome, ${user.username}` : "Please log in"}</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <p>You are logged in as {user.username}</p>
          ) : (
            <p>Please log in to access your account.
              <Link href={'/login'}>LOgin</Link>
            </p>
          )}
        </CardContent>
       
      </Card>
    </div>
  );
}