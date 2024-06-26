import * as React from "react";
import { Connector, useConnect } from "wagmi";

export default function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors
    .filter((connector) => connector.name.toLowerCase() === "metamask")
    .map((connector) => (
      <button key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
      </button>
    ));
}
