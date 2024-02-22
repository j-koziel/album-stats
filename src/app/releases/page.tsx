"use client";

import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React from "react";
import { encode } from "urlencode";

import { AlbumCard } from "@/components/album-card";
import { AlbumModal } from "@/components/album-modal";
import { spotifyApiEndpoints } from "@/lib/config";
import { Carousel } from "@/components/carousel";
import {
  AlbumSearchResponse,
  SimplifiedAlbum,
  Album,
} from "@/types/spotify-responses";

export default function Albums() {
  const [albumSearchQuery, setAlbumSearchQuery] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [albumSearchResultsData, setAlbumSearchResultsData] =
    React.useState<AlbumSearchResponse | null>(null);
  const [latestReleasesData, setLatestReleasesData] = React.useState<
    any | null
  >(null);
  const [albumInfo, setAlbumInfo] = React.useState<Album | null>(null);
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  React.useEffect(() => {
    const getLatestReleases = async () => {
      const res = await axios.get(
        `${spotifyApiEndpoints.albums.latestReleases}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLatestReleasesData(res.data.albums.items);
    };
    getLatestReleases();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!albumSearchQuery) {
      setIsInvalid(true);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setAlbumSearchResultsData(null);
    setIsInvalid(false);

    const res = await axios.get(
      `
${spotifyApiEndpoints.search.album}&q=${encode(albumSearchQuery, "gbk")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log(res.data);
    setAlbumSearchResultsData(res.data);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-4">Browse all releases</h1>
      <form
        className="flex items-center justify-center w-full gap-x-2 mb-4"
        onSubmit={onSubmit}
      >
        <Input
          type="text"
          placeholder="Search for an album..."
          className="w-1/2"
          value={albumSearchQuery}
          onChange={(e) => setAlbumSearchQuery(e.target.value)}
          autoFocus
          isInvalid={isInvalid}
          errorMessage={isInvalid ? "Please type something into the box" : null}
        />
        <Button
          type="submit"
          color="primary"
          size="md"
          variant="ghost"
          isLoading={isSearching}
        >
          <MagnifyingGlassIcon />
        </Button>
      </form>
      {albumSearchResultsData && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {albumSearchResultsData.albums.items.map(
            (album: SimplifiedAlbum, i: number) => (
              <AlbumCard
                key={i}
                album={album}
                setAlbumInfo={setAlbumInfo}
                openModal={onOpen}
                className="flex flex-col w-[300px]"
              />
            )
          )}
        </div>
      )}
      {latestReleasesData ? (
        <section className="flex flex-col">
          <div>Latest Releases</div>
          <div>
            <Carousel
              items={latestReleasesData.map(
                (album: SimplifiedAlbum, i: number) => (
                  <AlbumCard
                    key={i}
                    album={album}
                    setAlbumInfo={setAlbumInfo}
                    className="flex flex-col w-64"
                    openModal={onOpen}
                  />
                )
              )}
              width={1000}
            />
          </div>
        </section>
      ) : (
        <Spinner label="Loading latest releases..." />
      )}
      {albumInfo && (
        <AlbumModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          albumInfo={albumInfo}
        />
      )}
    </div>
  );
}
