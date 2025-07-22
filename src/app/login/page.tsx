"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { RiDiscordFill } from "@remixicon/react";
import Link from "next/link";
import { FormEvent } from "react";

export default function LoginForm() {
  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    authClient.signIn.email({ email: email, password: password });
  };

  const handleDiscordLogin = async () => {
    authClient.signIn.social({
      provider: "discord",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to mono</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Button
            variant="outline"
            className="w-full mt-2 cursor-pointer"
            onClick={handleDiscordLogin}
          >
            <RiDiscordFill /> Login with Discord
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
