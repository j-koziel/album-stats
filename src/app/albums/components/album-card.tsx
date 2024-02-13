import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React from "react";

export function AlbumCard({
  album,
  className,
  setAlbumInfo,
  openModal,
}: {
  album: any;
  className?: string;
  setAlbumInfo: React.Dispatch<any>;
  openModal: () => void;
}) {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col">
        <p>{album.title}</p>
        <Image
          src={album.cover_image}
          alt={album.title}
          height={200}
          width={200}
        />
      </CardHeader>
      <CardBody>
        <div className="flex gap-x-2 gap-y-2 flex-wrap">
          {album.genre.map((genre: string, i: number) => (
            <Chip key={i} color="primary">
              {genre}
            </Chip>
          ))}
          {album.style.map((genre: string, i: number) => (
            <Chip key={i}>{genre}</Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex gap-x-2">
        {isLiked && <HeartFilledIcon onClick={() => setIsLiked(false)} />}
        {!isLiked && (
          <HeartIcon
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => setIsLiked(true)}
          />
        )}
        {Math.floor(Math.random() * 100)}k
        <Button
          onPress={async () => {
            const res = await axios.get(album.master_url, {
              headers: {
                Authorization: `Discogs token=${process.env.NEXT_PUBLIC_DISCOGS_API_KEY}`,
                "User-Agent": "AlbumStats/0.1",
              },
            });

            console.log(res.data);

            setAlbumInfo(res.data);
            openModal();
          }}
        >
          More info
        </Button>
      </CardFooter>
    </Card>
  );
}
