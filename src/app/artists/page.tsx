"use client";

import {
  Input,
  Button,
  Image,
  Card,
  CardHeader,
  CardBody,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import axios from "axios";
import { spotifyApiEndpoints } from "@/lib/config";
import encode from "urlencode";
import {
  Artist,
  ArtistSearchItem,
  ArtistSearchResponse,
} from "@/types/spotify-responses";

export default function Artists() {
  const [query, setQuery] = React.useState<string>("");
  const [searchData, setSearchData] =
    React.useState<ArtistSearchResponse | null>(null);
  const [artistInfo, setArtistInfo] = React.useState<Artist | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `${spotifyApiEndpoints.search.artist}&q=${encode(query, "gbk")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    console.log(res.data);
    setSearchData(res.data);
  };

  return (
    <div className="w-1/2">
      <form onSubmit={onSearchSubmit}>
        <Input
          type="text"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" className="w-1/2">
          Search
        </Button>
      </form>
      {searchData && (
        <div className="grid grid-cols-2 gap-2">
          {searchData.artists.items.map(
            (artistData: ArtistSearchItem, i: number) => {
              console.log(artistData.images);

              return (
                <div key={i}>
                  <Card>
                    <CardHeader>
                      <p>{artistData.name}</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      {artistData.images.length === 0 ? null : (
                        <Image
                          src={artistData.images[0].url}
                          alt={artistData.name}
                          className="object-cover"
                          height={200}
                          width={200}
                        />
                      )}

                      <Button
                        onPress={async () => {
                          const res = await axios.get(artistData.href, {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                              )}`,
                            },
                          });

                          console.log(res.data);
                          setArtistInfo(res.data);

                          onOpen();
                        }}
                      >
                        Select
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              );
            }
          )}
        </div>
      )}
      {searchData && (
        <Pagination
          initialPage={searchData.artists.offset}
          total={searchData.artists.total / searchData.artists.limit}
        />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[500px]">
        <ModalContent>
          {artistInfo && (
            <div>
              <ModalHeader>{artistInfo.name}</ModalHeader>
              <ModalBody>
                <Image
                  src={artistInfo.images[0].url}
                  alt={artistInfo.name}
                  height={200}
                  width={200}
                />
                <p className="overflow-y-scroll h-32 scrollbar-hide">
                  Spotify has no bio....
                </p>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
