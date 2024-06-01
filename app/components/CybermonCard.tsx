import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/app/configs/apiClient";
import { format } from "date-fns";
import { IconBolt, IconClover } from "@tabler/icons-react";

const Level = ({ value }: { value: number }) => (
  <div className="w-full p-1 bg-white rounded-lg flex items-center gap-x-4">
    <div className="w-10 h-10 bg-[#9D9D8C] rounded-md">
      <IconClover size={40} color="white" />
    </div>
    <p className="font-black">{value}</p>
  </div>
);
const Energy = ({ value }: { value: number }) => (
  <div className="w-full p-1 bg-white rounded-lg flex items-center gap-x-4">
    <div className="w-10 h-10 bg-[#CE9C1C] rounded-md">
      <IconBolt size={40} color="white" />
    </div>
    <p className="font-black">{value}</p>
  </div>
);

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
    <div className="w-[444px] h-[286px] bg-[#EDEDE7] p-4 rounded-xl">
      <div className="flex h-[200px] gap-x-3">
        <img
          height={200}
          width={200}
          className="w-[200px] rounded-2xl object-cover"
          src={cybermon?.picture}
          alt="cybermon"
        />
        <div className="w-[200px] flex flex-col gap-y-3 self-end">
          <div>
            <p className="text-[40px] leading-none font-serif">
              {cybermon?.name}
            </p>
            <p className="text-xs">
              {cybermon && format(cybermon?.catched_ts * 1000, "yyyy-MM-dd")}
            </p>
            <p className="text-xs">We meet on-chain at</p>

            <a
              className="text-xs font-thin break-all hover:underline block"
              href={`https://cyberscan.co/tx/${cybermon?.catched_tx}`}
              target="_blank"
            >
              {cybermon?.catched_tx}
            </a>
          </div>
          <div className="flex gap-x-1">
            <Level value={cybermon?.level} />
            <Energy value={cybermon?.energy} />
          </div>
        </div>
      </div>
      <button
        className="text-sm bg-black px-4 py-2 rounded-full text-white mt-4 whitespace-nowrap w-full"
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
