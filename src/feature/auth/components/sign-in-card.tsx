"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SignInValues } from "./forms/validation";
import { SignInForm } from "./forms/sign-in-form";
import { AuthFlow } from "../types";

interface SignInCardProps {
  setState: (value: AuthFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuthActions();

  const onProvider = (provider: "google" | "github") => {
    setPending(true);
    signIn(provider).finally(() => {
      setPending(false);
    });
  };

  const onPasswordSignin = ({ email, password }: SignInValues) => {
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {})
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <SignInForm disabled={pending} onSubmit={onPasswordSignin} />
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            variant="outline"
            onClick={() => onProvider("google")}
            size="lg"
            className="relative w-full"
          >
            <FcGoogle className="absolute left-2.5 top-3 size-5" />
            Continue with Google
          </Button>

          <Button
            disabled={pending}
            variant="outline"
            onClick={() => onProvider("github")}
            size="lg"
            className="relative w-full"
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with Github
          </Button>
        </div>
        <div className="text-sm">
          Don&apos;t have an account?{" "}
          <span
            role="button"
            className="font-medium text-sky-700 transition hover:underline"
            onClick={() => setState("singUp")}
          >
            Sign up
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
