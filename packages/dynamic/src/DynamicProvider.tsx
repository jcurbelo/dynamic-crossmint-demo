"use client";

import type React from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { arbitrum, base, baseSepolia, mainnet, polygon } from "wagmi/chains";

interface AuthProvidersProps {
  logoutCallback?: () => Promise<void> | void;
  loginCallback?: () => Promise<void> | void;
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [mainnet, base, baseSepolia, arbitrum, polygon],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
});

function DynamicProvider({ children }: AuthProvidersProps) {
  const handleLogout = async () => console.log("Logout");

  const handleLogin = async () => {
    const authToken = getAuthToken();
    if (!authToken) return;
    console.log("Login");
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID as string,
        walletConnectors: [EthereumWalletConnectors],
        shadowDOMEnabled: false,
        deepLinkPreference: "native",
        mobileExperience: "redirect",
        networkValidationMode: "never",
        events: {
          onLogout: async () => await handleLogout(),
          onAuthSuccess: async () => await handleLogin(),
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

DynamicProvider.displayName = "Dynamic Auth Provider";

export { DynamicProvider };
