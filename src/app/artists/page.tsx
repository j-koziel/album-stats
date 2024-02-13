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

export default function Artists() {
  const [query, setQuery] = React.useState<string>("");
  const [searchData, setSearchData] = React.useState<any | never>(null);
  const [artistInfo, setArtistInfo] = React.useState<any | never>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.discogs.com/database/search?q=${query}&type=artist`,
      {
        headers: {
          Authorization: `Discogs token=${process.env.NEXT_PUBLIC_DISCOGS_API_KEY}`,
          "User-Agent": "AlbumStats/0.1",
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
          {searchData.results.map((artistData: any, i: number) => (
            <div key={i}>
              <Card>
                <CardHeader>
                  <p>{artistData.title}</p>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    src={artistData.cover_image}
                    alt={artistData.title}
                    className="object-cover"
                    height={200}
                    width={200}
                  />

                  <Button
                    onPress={async () => {
                      const res = await axios.get(artistData.resource_url, {
                        headers: {
                          Authorization: `Discogs token=${process.env.NEXT_PUBLIC_DISCOGS_API_KEY}`,
                          "User-Agent": "AlbumStats/0.1",
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
          ))}
        </div>
      )}
      {searchData && (
        <Pagination
          initialPage={searchData.pagination.page}
          total={searchData.pagination.pages}
        />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="h-[500px]">
        <ModalContent>
          {artistInfo && (
            <div>
              <ModalHeader>{artistInfo.name}</ModalHeader>
              <ModalBody>
                <Image
                  src={artistInfo.images[0].resource_url}
                  alt={artistInfo.name}
                  height={200}
                  width={200}
                />
                <p className="overflow-y-scroll h-32 scrollbar-hide">
                  {artistInfo.profile}
                </p>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
