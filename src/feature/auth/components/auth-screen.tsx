"use client";

import { useState } from "react";

import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { AuthFlow } from "../types";

export const AuthScreen = () => {
  const [state, setState] = useState<AuthFlow>("signIn");

  return state === "signIn" ? (
    <SignInCard setState={setState} />
  ) : (
    <SignUpCard setState={setState} />
  );
};
