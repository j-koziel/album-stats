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
        <p>{album.name}</p>
        <Image
          src={
            album.images.filter(
              (image: any) => image.height === 300 && image.width === 300
            )[0].url
          }
          alt={album.name}
          height={200}
          width={200}
        />
      </CardHeader>
      <CardBody></CardBody>
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
            const res = await axios.get(album.href, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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