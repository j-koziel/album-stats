import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return <p>Hello {data.user.email}</p>;
}
