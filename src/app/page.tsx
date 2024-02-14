import { SpotifyAuthButton } from "@/components/spotify-auth-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-9xl">
      yo
      <p className="text-xl">Please first login with your spotify account</p>
      <p className="text-xl">
        Then you will be redirected to the albums search page
      </p>
      <SpotifyAuthButton />
    </main>
  );
}
