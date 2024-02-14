import { SpotifyAuthButton } from "@/components/spotify-auth-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-9xl">
      yo
      <div className="flex flex-col text-xl mt-12">
        <p>Please first login with your spotify account</p>
        <p>Then you will be redirected to the albums search page</p>
      </div>
      <SpotifyAuthButton />
    </main>
  );
}
