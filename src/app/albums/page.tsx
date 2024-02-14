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

import { AlbumCard } from "./components/album-card";
import { SpotifyAuthButton } from "@/components/spotify-auth-button";

export default function Albums() {
  const [albumSearchQuery, setAlbumSearchQuery] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [albumSearchResultsData, setAlbumSearchResultsData] = React.useState<
    any | never
  >(null);
  const [albumInfo, setAlbumInfo] = React.useState<any | never>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // React.useEffect(() => {}, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
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

    console.log(res.data);
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
      {!albumSearchResultsData && (
        <section className="flex flex-col">
          <div>Latest Releases</div>
          <div>...</div>
        </section>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[500px]">
        {albumInfo && (
          <ModalContent className="overflow-y-scroll scrollbar-thin scrollbar-track-background scrollbar-thumb-default">
            <ModalHeader className="flex flex-col">
              {albumInfo.name}
              <div className="flex gap-x-2">
                {albumInfo.artists.map((artist: any, i: number) => (
                  <p key={i}>{artist.name}</p>
                ))}
              </div>
            </ModalHeader>
            <ModalBody>
              <Image src={albumInfo.images[0].url} alt={albumInfo.name} />
              <h3 className="font-bold">Rate:</h3>
              <div className="flex mb-2">
                {ratings.map((rating, i) => (
                  <StarIcon key={i} height={36} width={36} />
                ))}
              </div>
              <div>
                <h3 className="font-bold">Description: </h3>
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam tincidunt nulla sit amet ultricies fermentum. Nulla
                  gravida eros eget sem dignissim aliquam. Donec semper, dui ut
                  viverra semper, neque sapien gravida mauris, et tempor turpis
                  nulla et tellus. Fusce laoreet faucibus varius. Etiam pharetra
                  mi vitae dapibus molestie.
                </p>
                <h2 className="font-bold mb-1">Tracks:</h2>
                <div className="h-[200px] overflow-y-scroll scrollbar-hide flex flex-col gap-y-2">
                  {albumInfo.tracks.items.map((track: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-2 border-foreground-200 rounded-md p-4"
                    >
                      <div className="flex gap-x-2">
                        <p>{track.track_number}.</p>
                        <p>{track.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          as={Link}
                          size="sm"
                          variant="bordered"
                          href={`${track.external_urls.spotify}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            icon={faSpotify}
                            size="2xl"
                            color="#1DB954"
                          />
                        </Button>
                        <Button
                          as={Link}
                          size="sm"
                          variant="bordered"
                          href={`https://music.apple.com/us/search?term=${encode(
                            track.name + " " + albumInfo.artists[0].name,
                            "gbk"
                          )}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Apple
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
}
