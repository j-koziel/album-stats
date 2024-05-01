"use client";

import { Button, Divider, Input, Link } from "@nextui-org/react";
import React from "react";

import { signup } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const initialState = {
  message: "",
  isErr: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      Sign Up
    </Button>
  );
}

export default function SignUp() {
  const [state, formAction] = useFormState(signup, initialState);

  React.useEffect(() => {
    if (state.isErr) {
      toast.error(state.message);
      return;
    }

    toast.success(state.message);
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-content1 w-[1000px] flex flex-col items-center justify-center rounded-lg py-5 md:flex-row">
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-xl md:text-5xl">Just one more step.</h1>
        </div>
        <Divider orientation="vertical" />
        <div className="w-1/2 flex flex-col items-center justify-center">
          <form className="flex flex-col items-center" action={formAction}>
            <Input
              type="text"
              placeholder="johndoe1"
              description="Your username"
              label="Please enter your username"
              name="username"
            />
            <Input
              type="email"
              placeholder="example@gmail.com"
              description="Your email address"
              label="Please enter your email"
              name="email"
            />
            <Input
              type="password"
              placeholder="●●●●●●●●"
              description="Set a password"
              label="Password"
              name="password"
            />
            <Input
              type="password"
              placeholder="●●●●●●●●"
              description="Confirm your password"
              label="Password Confirm"
              name="password-confirm"
            />
            <SubmitButton />
          </form>
          <div>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
