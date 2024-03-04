import { Button, Divider, Input } from "@nextui-org/react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-content1 w-[1000px] flex items-center justify-center rounded-md py-5">
        <section className="w-1/2 flex items-center justify-center">
          <h1 className="text-5xl">Just one more step.</h1>
        </section>
        <Divider orientation="vertical" />
        <section className="w-1/2 flex items-center justify-center">
          <form className="flex flex-col items-center">
            <Input
              type="email"
              placeholder="example@gmail.com"
              description="Your email address"
              label="Please enter your email"
            />
            <Input
              type="password"
              placeholder="●●●●●●●●"
              description="Set a password"
              label="Password"
            />
            <Input
              type="password"
              placeholder="●●●●●●●●"
              description="Confirm your password"
              label="Password Confirm"
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
