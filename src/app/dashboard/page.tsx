"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { getUserThunk } from "@/lib/store/thunks/get-user-thunk";
import { SpotifyAuthButton } from "@/components/spotify-auth-button";

export default function Dashboard() {
  const state = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getUserData = async () => {
      await dispatch(getUserThunk());
    };

    getUserData();
  }, []);

  // const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();

  // if (error || !data?.user) {
  //   redirect("/sign-in");
  // }

  // const { data: profile } = await supabase.from("profiles").select("*");

  const renderConnectSpotifyButton = (isSpotifyConnected: boolean) => {
    return !isSpotifyConnected ? <SpotifyAuthButton /> : null;
  };

  const renderReviewedAlbums = () => (
    <Carousel>
      <CarouselContent>
        {state.user
          ? state.user.reviewed_albums.map((album: any, i: number) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                hello
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  return (
    <div className="min-h-screen">
      {renderConnectSpotifyButton(state.user.is_spotify_connected)}
      <div>
        <div>
          <h2>Your reviewed albums</h2>
        </div>
        <div>{renderReviewedAlbums()}</div>
      </div>
    </div>
  );
}
