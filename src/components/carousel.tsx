"use client";

import { Button } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

export function Carousel({
  items,
  width,
}: {
  items: JSX.Element[];
  width: number;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const moveLeft = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= width + 5;
    }
  };

  const moveRight = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += width + 5;
    }
  };

  return (
    <div className="flex justify-between items-center gap-x-[10px] pl-0 pr-0">
      <Button onPress={moveLeft} size="sm" radius="full">
        <ChevronLeftIcon />
      </Button>
      <div
        ref={listRef}
        className="flex gap-[5px] px-[5px] overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-none transition-all"
        style={{ msOverflowStyle: "none", width }}
      >
        {items.map((item, i: number) => (
          <div key={i} className="snap-center">
            {item}
          </div>
        ))}
      </div>
      <Button onPress={moveRight} size="sm" radius="full">
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
