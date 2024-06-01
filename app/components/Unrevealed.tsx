import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../configs/apiClient";

const Level = () => <div className="w-full h-12 bg-white rounded-lg"></div>;
const Energy = () => <div className="w-full h-12 bg-white rounded-lg"></div>;

const Unrevealed = ({
  tx,
  successCallback,
}: {
  tx: string;
  successCallback: () => void;
}) => {
  const { address } = useAccount();

  const { isPending, data, mutate } = useMutation({
    mutationFn: () =>
      apiClient.post("/cybermon/catch", {
        address,
      }),
    onSuccess: () => {
      successCallback();
    },
  });

  return (
    <div className="w-[444px] h-[370px] bg-[#EDEDE7] p-4 rounded-2xl">
      <div className="flex h-[284px] gap-x-3">
        <div className="h-full w-[200px] bg-white rounded-2xl overflow-hidden">
          <img
            src="/unrevealed.jpg"
            alt="Unrevealed"
            width={200}
            height="100%"
          />
        </div>
        <div className="w-[200px] flex flex-col gap-y-3 self-end">
          <div>
            <p className="text-[40px]">???</p>
            <p className="text-xs">June 02, 2024</p>
            <p className="text-xs">We meet on-chain at</p>
            <a
              className="text-xs font-thin break-all hover:underline block"
              href={`https://cyberscan.co/tx/${tx}`}
              target="_blank"
            >
              {tx}
            </a>
          </div>
        </div>
      </div>
      <button
        className="text-sm bg-black px-4 py-2 rounded-full text-white mt-8 whitespace-nowrap"
        onClick={() => mutate()}
      >
        I swear I will take good care of it <br /> and feed it for life 3{">"}
      </button>
    </div>
  );
};

export default Unrevealed;
