import { Button, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import queryString from "query-string";

export function SpotifyAuthButton() {
  const form: string = queryString.stringify({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope: "user-read-private user-read-email",
    redirect_uri:
      process.env.NODE_ENV === "production"
        ? "https://album-stats.vercel.app/callback"
        : "http://localhost:3000/callback",
  });

  return (
    <Button
      as={Link}
      rel="noreferrer"
      href={`https://accounts.spotify.com/authorize?${form}`}
      size="lg"
      variant="ghost"
      className="flex"
    >
      <FontAwesomeIcon icon={faSpotify} size="xs" />
      <p className="text-[#1DB954]">Login with Spotify</p>
    </Button>
  );
}
