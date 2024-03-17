"use client";

import { Button, Divider, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";

import { createNewUser } from "@/lib/mongodb/user-controller";
import { useRouter } from "next/navigation";
import React from "react";

const initialState = {
  message: "",
};

export default function SignUp() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createNewUser, initialState);
  const router = useRouter();

  React.useEffect(() => {
    if (state.message === "User created successfully") {
      router.push("/dashboard");
    }
  }, [router, state]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-content1 w-[1000px] flex items-center justify-center rounded-lg py-5">
        <section className="w-1/2 flex items-center justify-center">
          <h1 className="text-5xl">Just one more step.</h1>
        </section>
        <Divider orientation="vertical" />
        <section className="w-1/2 flex items-center justify-center">
          <form action={formAction} className="flex flex-col items-center">
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
            <Button type="submit" aria-disabled={pending} isDisabled={pending}>
              Sign Up
            </Button>
            <p aria-live="polite" role="status">
              {state?.message}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
