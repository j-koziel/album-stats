"use client";

import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";
import axios from "axios";
import { useSearchParams, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function GetAndSetAccessToken() {
  const supabase = createClient();

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

      localStorage.setItem("spotify_access_token", res.data.access_token);

      const { data, error } = await supabase.auth.updateUser({
        data: { is_spotify_connected: true },
      });

      if (error) {
        toast.error("Your spotify account could not be connected.");
      }

      toast.success("Your spotify account was successfully connected!");
      return;
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
