import {
  Album,
  SimplifiedArtist,
  SimplifiedTrack,
} from "@/types/spotify-responses";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Image,
  ModalFooter,
  Chip,
  ScrollShadow,
  Tooltip,
} from "@nextui-org/react";
import { StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import encode from "urlencode";

export function AlbumModal({
  albumInfo,
  isOpen,
  onOpenChange,
}: {
  albumInfo: Album;
  isOpen: boolean;
  onOpenChange: ((isOpen: boolean) => void) | undefined;
}) {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      className="text-foreground"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col">
          {albumInfo.name}
          <div className="flex gap-x-2">
            {albumInfo.artists.map((artist: any, i: number) => (
              <p key={i}>{artist.name}</p>
            ))}
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-2">
            <div className="flex flex-col gap-y-2">
              <Image
                src={albumInfo.images[0].url}
                alt={albumInfo.name}
                height={400}
                width={400}
              />
              <h3 className="font-bold">Rate:</h3>
              <Tooltip content="Please sign in to rate this album">
                <div className="flex mb-2">
                  {ratings.map((_, i) => (
                    <StarIcon key={i} height={36} width={36} />
                  ))}
                </div>
              </Tooltip>
            </div>

            <div>
              <h3 className="font-bold">Details: </h3>
              <div className="mb-2">
                <p className="mb-2">{albumInfo.release_date}</p>
                <p className="mb-2">Total Tracks: {albumInfo.total_tracks}</p>
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

                      return featuredArtists.map((artist: any, i: number) => (
                        <Chip
                          key={i}
                          as={Link}
                          href={artist.external_urls.spotify}
                        >
                          {artist.name}
                        </Chip>
                      ));
                    })}
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
                  )
                )}
              </ScrollShadow>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <p>Label: {albumInfo.label}</p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
