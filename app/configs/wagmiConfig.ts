import { http, createConfig } from "wagmi";
import { cyber } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [cyber],
    transports: {
      [cyber.id]: http(),
    },
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    appName: "Cybermon",
  }),
);
