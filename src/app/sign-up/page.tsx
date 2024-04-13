import { Button, Divider, Input, Link } from "@nextui-org/react";
import { signup } from "./actions";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-content1 w-[1000px] flex flex-col items-center justify-center rounded-lg py-5 md:flex-row">
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-xl md:text-5xl">Just one more step.</h1>
        </div>
        <Divider orientation="vertical" />
        <div className="w-1/2 flex flex-col items-center justify-center">
          <form className="flex flex-col items-center">
            <Input
              type="text"
              placeholder="John Doe"
              description="Your name"
              label="Please enter your name"
              name="name"
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
            <Button type="submit" formAction={signup}>
              Sign Up
            </Button>
          </form>
          <div>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
