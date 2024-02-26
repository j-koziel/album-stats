"use client";

import {
  Album,
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
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setAlbumInfo(res.data);
    };

    fetchAlbumData();
  }, []);

  return albumInfo ? (
    <div>
      {albumInfo.name}
      <div className="flex gap-x-2">
        {albumInfo.artists.map((artist: SimplifiedArtist, i: number) => (
          <p key={i}>{artist.name}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-y-2">
          <Image
            src={albumInfo.images[0].url}
            alt={albumInfo.name}
            height={400}
            width={400}
          />
          <h3 className="font-bold">Rate:</h3>
          {/* <Tooltip content="Please sign in to rate this album">
                <div className="flex mb-2">
                  {ratings.map((_, i) => (
                    <StarIcon key={i} height={36} width={36} />
                  ))}
                </div>
              </Tooltip> */}
        </div>

        <div>
          <h3 className="font-bold">Details: </h3>
          <div className="mb-2">
            <div className="mb-1 flex gap-x-1">
              Released:
              <div className="flex gap-x-1">
                <p>{formatDayOfMonth(11)}</p>
                <p>
                  {formatMonth(new Date(albumInfo.release_date).getMonth())}
                </p>
                <p>{new Date(albumInfo.release_date).getFullYear()}</p>
              </div>
            </div>
            <p className="mb-1">Total Tracks: {albumInfo.total_tracks}</p>
            <div>
              <h3>Featured Artists:</h3>
              <div className="flex gap-2 flex-wrap">
                {albumInfo.tracks.items.map((track: SimplifiedTrack) => {
                  const featuredArtists: SimplifiedArtist[] = [];

                  track.artists.forEach((artist: SimplifiedArtist) => {
                    if (artist.name != albumInfo.artists[0].name) {
                      featuredArtists.push(artist);
                    }
                  });

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
                })}
              </div>
            </div>
          </div>
          <h2 className="font-bold mb-1">Tracks:</h2>
          <ScrollShadow
            className="h-[250px] flex flex-col gap-y-1"
            hideScrollBar
          >
            {albumInfo.tracks.items.map((track: SimplifiedTrack, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between border-2 border-foreground-200 rounded-md p-4"
              >
                <div className="flex gap-x-2">
                  <p>{track.track_number}.</p>
                  <div className="flex gap-x-2">
                    <p className="truncate w-[90%]">{track.name}</p>
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
            ))}
          </ScrollShadow>
        </div>
      </div>
    </div>
  ) : (
    <Spinner label="Loading album data..." />
  );
}
