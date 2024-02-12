"use client";

import {
  Input,
  Button,
  Image,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import React from "react";
import axios from "axios";

export default function Artists() {
  const [query, setQuery] = React.useState<string>("");
  const [searchData, setSearchData] = React.useState<any | never>(null);

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.discogs.com/database/search?q=${query}&type=artist`,
      {
        headers: {
          Authorization: `Discogs token=xdLvwQGwLcFDVEaomdmKuksBmkKrRjltszZscdHt`,
        },
      }
    );

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
        <div>
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
                    width={200}
                    height={200}
                  />
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
