"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function RegisterPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const registerUser = async () => {
    try {
      await signUp.create({ emailAddress: email, password });
      signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast({
        title: "Verification email sent!",
        description: "Please check your email for the verification code.",
      });
    } catch (e: any) {
      toast({
        title: "Registration failed",
        description: e.errors[0].message,
        variant: "destructive",
      });
      console.error(e);
    }
  };

  const verifyEmail = async () => {
    try {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === "complete") {
        setActive({ session: res.createdSessionId });
        router.push("/");
        toast({
          title: "Verification successful!",
          description: "You are now logged in.",
        });
      }
    } catch (e: any) {
      toast({
        title: "Verification failed",
        description: e.errors[0].message,
        variant: "destructive",
      });
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {!pendingVerification ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerUser();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-3"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-3"
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyEmail();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button type="submit" className="w-full">
                Verify Email
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
