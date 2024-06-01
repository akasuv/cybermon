"use client";
import Image from "next/image";
import MonCatchers from "./components/MonCatchers";
import Catching from "./components/Catching";
import Intro from "./components/Intro";
import Catched from "./components/Catched";
import Explore from "./components/Explore";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./configs/apiClient";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { status, data, error, isFetching, isFetched, refetch } = useQuery({
    queryKey: ["/me/basic", { address }],
    queryFn: async ({ queryKey }) => {
      const { data } = await apiClient.get(`${queryKey[0]}?address=${address}`);
      return data;
    },
    enabled: !!address,
  });

  const [shouldShowCatching, setShouldShowCatching] = useState(true);

  const shouldShowIntro = !isConnected;
  const shouldShowMonCatchers =
    data?.data.cybermon_count === 0 && data?.data.moncatcher_count === 0;

  console.log("shouldShowCatching", shouldShowCatching);

  useEffect(() => {
    const shouldShowCatching =
      data && data.data.cybermon_count === 0 && data.data.moncatcher_count > 0;

    setShouldShowCatching(shouldShowCatching);
  }, [data]);

  const { data: catchingData } = useQuery({
    queryKey: ["/cybermon/catching/query"],
    queryFn: async () => {
      const { data } = await apiClient.get(
        "/cybermon/catching/query?address=" + address,
      );
      return data;
    },
    enabled: true,
    refetchInterval: 3000,
  });

  const shouldShowCatched = catchingData?.data.catched;
  const catchedHash = catchingData?.data.catched_tx;
  const catchedTS = catchingData?.data.catched_ts;
  const shouldShowExplore = data?.data.cybermon_count > 0;

  useEffect(() => {
    if (shouldShowCatched) {
      setShouldShowCatching(false);
      refetch();
    }
  }, [shouldShowCatched, refetch]);

  const render = () => {
    if (shouldShowIntro) {
      return <Intro />;
    }

    if (shouldShowExplore) {
      return <Explore />;
    }

    if (shouldShowCatched) {
      return (
        <Catched
          ts={catchedTS}
          tx={catchedHash}
          successCallback={() => {
            refetch();
          }}
        />
      );
    }
    if (shouldShowCatching && !catchingData?.data.catched) {
      return <Catching />;
    }
    if (shouldShowMonCatchers) {
      return (
        <MonCatchers
          successCallback={() => {
            refetch();
          }}
        />
      );
    }

    return <Intro />;
  };

  return (
    <main className="h-screen pt-[58px] w-[576px] mx-auto">
      <div className="flex items-center justify-between pb-[76px]">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" width={24} height={24} alt="logo" />
          <h1 className="text-sm text-center font-black">Cybermon</h1>
        </div>
        <ConnectKitButton />
      </div>
      {/* <button onClick={handleBindTelegram}>Bind Telegram</button> */}
      <div>{render()}</div>
    </main>
  );
}
