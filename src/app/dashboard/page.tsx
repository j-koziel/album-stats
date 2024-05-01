import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  const { data: profile } = await supabase.from("profiles").select("*");

  console.log(profile);

  return <div className="min-h-screen">Welcome back, {data.user.email}</div>;
}
