"use client";

import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";
import axios from "axios";
import { useSearchParams, redirect } from "next/navigation";

function GetAndSetAccessToken() {
  const searchParams = useSearchParams();

  const authCode = searchParams.get("code");

  React.useEffect(() => {
    const getAccessToken = async () => {
      const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri:
            process.env.NODE_ENV === "production"
              ? "https://album-stats.vercel.app/callback"
              : "http://localhost:3000/callback",
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      localStorage.setItem("accessToken", res.data.access_token);
    };

    getAccessToken();

    redirect("/releases");
  }, []);

  return <Spinner />;
}

export default function Callback() {
  return (
    <Suspense>
      <GetAndSetAccessToken />
    </Suspense>
  );
}
