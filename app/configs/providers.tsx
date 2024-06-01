"use client";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmiConfig";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
