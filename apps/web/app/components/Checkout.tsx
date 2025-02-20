"use client";

import { CrossmintEmbeddedCheckout } from "@repo/crossmint";
import { useDynamicContext } from "@repo/dynamic";

const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

export default function Checkout() {
  const { primaryWallet } = useDynamicContext();
  const isAuthenticated = !!primaryWallet;

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col items-center justify-start h-screen p-6 bg-white">
      <div className="max-w-[450px] w-full">
        <CrossmintEmbeddedCheckout
          lineItems={{
            collectionLocator: `crossmint:${collectionId}`,
            callData: {
              totalPrice: "1",
              amount: 1,
            },
          }}
          payment={{
            crypto: { enabled: false },
            fiat: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}
