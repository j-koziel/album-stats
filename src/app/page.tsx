import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  const renderHomePageContent = () => {
    if (!data.user) {
      return (
        <h1 className="text-5xl">
          You need an account to make reviews on this app.
        </h1>
      );
    }

    return <h1 className="text-5xl">Go make some reviews!!!</h1>;
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {renderHomePageContent()}
    </main>
  );
}
