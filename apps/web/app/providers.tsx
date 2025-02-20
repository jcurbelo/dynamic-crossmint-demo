"use client";

import type { ReactNode } from "react";
import { CrossmintProvider } from "@repo/crossmint";
import { DynamicProvider } from "@repo/dynamic";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DynamicProvider>
      <CrossmintProvider
        apiKey={process.env.NEXT_PUBLIC_CLIENT_API_KEY as string}
      >
        {children}
      </CrossmintProvider>
    </DynamicProvider>
  );
}
