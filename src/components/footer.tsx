import Image from "next/image";
import { Divider } from "@nextui-org/react";

import vercelIcon from "../../public/vercel.svg";

export function Footer() {
  return (
    <div>
      <Divider />
      <div className="flex gap-x-2 items-center justify-center text-lg py-2">
        Powered by
        <Image src={vercelIcon} alt="The vercel logo" width={48} height={36} />
      </div>
    </div>
  );
}
