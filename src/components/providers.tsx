"use client";

import { NextUIProvider } from "@nextui-org/react";
import { StoreProvider } from "./store-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <StoreProvider>{children}</StoreProvider>
    </NextUIProvider>
  );
}
