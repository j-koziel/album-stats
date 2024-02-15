"use client";

import {
  Button,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { MagnifyingGlassIcon, StarIcon } from "@radix-ui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import React from "react";
import { encode } from "urlencode";

import { AlbumCard } from "@/components/album-card";
import { AlbumModal } from "@/components/album-modal";
import { spotifyApiEndpoints } from "@/lib/config";
import { Carousel } from "@/components/carousel";

export default function Albums() {
  const [albumSearchQuery, setAlbumSearchQuery] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [albumSearchResultsData, setAlbumSearchResultsData] = React.useState<
    any | never
  >(null);
  const [latestReleasesData, setLatestReleasesData] = React.useState<
    any | never
  >(null);
  const [albumInfo, setAlbumInfo] = React.useState<any | never>(null);
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
    setIsSearching(true);
    setAlbumSearchResultsData(null);
    const res = await axios.get(
      `
https://api.spotify.com/v1/search?q=${encode(
        albumSearchQuery,
        "gbk"
      )}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    setAlbumSearchResultsData(res.data);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-4">Browse all albums</h1>
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
          {albumSearchResultsData.albums.items.map((album: any, i: number) => (
            <AlbumCard
              key={i}
              album={album}
              setAlbumInfo={setAlbumInfo}
              openModal={onOpen}
              className="flex flex-col w-[300px]"
            />
          ))}
        </div>
      )}
      {latestReleasesData && (
        <section className="flex flex-col">
          <div>Latest Releases</div>
          <Carousel
            items={latestReleasesData.map((album: any, i: number) => (
              <AlbumCard
                key={i}
                album={album}
                setAlbumInfo={setAlbumInfo}
                className="flex flex-col"
                openModal={onOpen}
              />
            ))}
            width={1000}
          />
        </section>
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
