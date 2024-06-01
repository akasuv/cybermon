import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/configs/apiClient";
const Level = () => <div className="w-full h-12 bg-white rounded-lg"></div>;
const Energy = () => <div className="w-full h-12 bg-white rounded-lg"></div>;

const CybermonCard = () => {
  const { address } = useAccount();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["/me/basic", { address }],
    queryFn: async ({ queryKey }) => {
      const { data } = await apiClient.get(`${queryKey[0]}?address=${address}`);
      return data;
    },
    enabled: !!address,
  });
  const { data: cybermonsData } = useQuery({
    queryKey: ["/me/cybermons", { address }],
    queryFn: async ({ queryKey }) => {
      const { data } = await apiClient.get(`${queryKey[0]}?address=${address}`);
      return data;
    },
    enabled: !!address,
  });

  console.log("cybermonsData", cybermonsData);

  const isTelegramLinked = data.data.tg_linked;

  const cybermon = cybermonsData?.data?.cybermons[0];

  const handleClick = () => {
    if (isTelegramLinked) {
      window.open("https://cyber.co/ecosystem");
    } else {
      window.open(`https://t.me/cyber_mon_bot?start=${address}`);
    }
  };

  return (
    <div className="w-[444px] h-[370px] bg-[#EDEDE7] p-4 rounded-2xl">
      <div className="flex h-[284px] gap-x-3">
        <div className="h-full w-[200px] bg-white rounded-2xl"></div>
        <div className="w-[200px] flex flex-col gap-y-3 self-end">
          <div>
            <p className="text-[40px]">Snorlax</p>
            <p className="text-xs">{cybermon.catched_ts}</p>
            <p className="text-xs">We meet on-chain at</p>

            <a
              className="text-xs font-thin break-all hover:underline block"
              href={`https://cyberscan.co/tx/${cybermon.catched_tx}`}
              target="_blank"
            >
              {cybermon.catched_tx}
            </a>
          </div>
          <Level />
          <Energy />
        </div>
      </div>
      <button
        className="text-sm bg-black px-4 py-2 rounded-full text-white mt-6 whitespace-nowrap w-full"
        onClick={handleClick}
      >
        {isTelegramLinked
          ? "Feed me with more transactions on Cyber"
          : "Bind with Your Cybermon on Telegram"}
      </button>
    </div>
  );
};

export default CybermonCard;
