"use client";

import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";
import type { ReactNode } from "react";
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
