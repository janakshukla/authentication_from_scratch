"use client"
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
import { useUser } from "@/store/userstore";

export default function Home() {
  
  const user = useUser((state) => state.user);
  console.log(user);

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
            <p>Please log in to access your account.</p>
          )}
        </CardContent>
        <CardFooter>
          {!user && (
            <>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" />
              <Button>Login</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}