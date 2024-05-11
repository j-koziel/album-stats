"use client";

import {
  Album,
  ImageObject,
  SimplifiedArtist,
  SimplifiedTrack,
} from "@/types/spotify-responses";
import { formatDayOfMonth, formatMonth } from "@/lib/format-date";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Chip,
  Link,
  ScrollShadow,
  Spinner,
  Tooltip,
  Image,
  Textarea,
} from "@nextui-org/react";
import { StarIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React from "react";
import encode from "urlencode";

export default function Release({ params }: { params: { id: string } }) {
  const [albumInfo, setAlbumInfo] = React.useState<Album | null>(null);

  React.useEffect(() => {
    const fetchAlbumData = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/albums/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "spotify_access_token"
            )}`,
          },
        }
      );

      setAlbumInfo(res.data);
    };

    fetchAlbumData();
  }, []);

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full min-h-screen px-28 py-10 flex items-center justify-center">
      {albumInfo ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-4">
              <Image
                src={
                  albumInfo.images.filter(
                    (image: ImageObject) => image.height === 300
                  )[0].url
                }
                alt={albumInfo.name}
              />
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <h1 className="text-5xl font-bold">{albumInfo.name}</h1>

                  <div className="flex gap-x-2 text-2xl">
                    {albumInfo.album_type} by {albumInfo.artists[0].name}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold">Details: </h3>
                  <div className="mb-2">
                    <div className="mb-1 flex gap-x-1">
                      Released:
                      <div className="flex gap-x-1">
                        <p>
                          {formatDayOfMonth(
                            new Date(albumInfo.release_date).getDate()
                          )}
                        </p>
                        <p>
                          {formatMonth(
                            new Date(albumInfo.release_date).getMonth()
                          )}
                        </p>
                        <p>{new Date(albumInfo.release_date).getFullYear()}</p>
                      </div>
                    </div>
                    <p className="mb-1">
                      Total Tracks: {albumInfo.total_tracks}
                    </p>
                    <div>
                      <h3>Featured Artists:</h3>
                      <div className="flex gap-2 flex-wrap">
                        {albumInfo.tracks.items.map(
                          (track: SimplifiedTrack) => {
                            const featuredArtists: SimplifiedArtist[] = [];

                            track.artists.forEach(
                              (artist: SimplifiedArtist) => {
                                if (artist.name != albumInfo.artists[0].name) {
                                  featuredArtists.push(artist);
                                }
                              }
                            );

                            return featuredArtists.map(
                              (artist: SimplifiedArtist, i: number) => (
                                <Chip
                                  key={i}
                                  as={Link}
                                  href={artist.external_urls.spotify}
                                >
                                  {artist.name}
                                </Chip>
                              )
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <h3 className="font-bold">Rate:</h3>
                  <Tooltip content="Please sign in to rate this album">
                    <div className="flex mb-2">
                      {ratings.map((_, i) => (
                        <StarIcon key={i} height={36} width={36} />
                      ))}
                    </div>
                  </Tooltip>
                </div>
                <div className="w-full">
                  <h3>Review:</h3>
                  <Textarea
                    label="Your review of this album"
                    placeholder="This album has a diverse sonic range..."
                  />
                </div>
              </div>
            </div>

            <h2 className="font-bold mb-1">Tracks:</h2>
            <ScrollShadow
              className="h-[250px] flex flex-col gap-y-1"
              hideScrollBar
            >
              {albumInfo.tracks.items.map(
                (track: SimplifiedTrack, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-x-10 border-2 border-foreground-200 rounded-md p-4"
                  >
                    <div className="flex gap-x-2">
                      <p>{track.track_number}.</p>
                      <div className="flex gap-x-2">
                        <p>{track.name}</p>
                        {track.explicit && <Chip color="default">E</Chip>}
                      </div>
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
                )
              )}
            </ScrollShadow>
          </div>
        </div>
      ) : (
        <Spinner label="Loading album data..." />
      )}
    </div>
  );
}
