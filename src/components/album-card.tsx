import { SimplifiedAlbum } from "@/types/spotify-responses";
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
import { useRouter } from "next/navigation";
import React from "react";

export function AlbumCard({
  album,
  className,
  setAlbumInfo,
  openModal,
}: {
  album: SimplifiedAlbum;
  className?: string;
  setAlbumInfo: React.Dispatch<any>;
  openModal: () => void;
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = React.useState<boolean>(false);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col gap-y-2">
        <Image
          src={
            album.images.filter(
              (image: any) => image.height === 300 && image.width === 300
            )[0].url
          }
          alt={album.name}
          height={300}
          width={300}
        />
      </CardHeader>
      <CardBody>
        <p className="w-3/4 truncate font-bold">{album.name}</p>
        Artist: {album.artists[0].name}
      </CardBody>
      <CardFooter className="flex justify-between">
        <span className="flex items-center gap-x-1">
          {isLiked && <HeartFilledIcon onClick={() => setIsLiked(false)} />}
          {!isLiked && (
            <HeartIcon
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => setIsLiked(true)}
            />
          )}
          {Math.floor(Math.random() * 100)}k
        </span>

        <Button
          // onPress={async () => {
          //   const res = await axios.get(album.href, {
          //     headers: {
          //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          //     },
          //   });

          //   setAlbumInfo(res.data);
          //   openModal();
          // }}
          onPress={() => {
            router.push(`/releases/${album.id}`);
          }}
        >
          More info
        </Button>
      </CardFooter>
    </Card>
  );
}
