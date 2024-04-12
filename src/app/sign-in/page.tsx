import { Button, Input } from "@nextui-org/react";
import { login } from "./actions";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">Sign In</h1>
      <form className="flex flex-col items-center gap-y-2">
        <Input
          type="email"
          label="Please enter your email"
          placeholder="example@gmail.com"
          description="The email address you signed up with"
          name="email"
          required
        />
        <Input
          type="password"
          label="Please enter your password"
          placeholder="●●●●●●●●"
          description="The password you set when signing up"
          name="password"
          required
        />
        <Button type="submit" formAction={login}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
