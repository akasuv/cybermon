import { useState } from "react";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../configs/apiClient";
import { useAccount, useSignMessage } from "wagmi";
import { IconLoader2 } from "@tabler/icons-react";

const Card = ({
  price,
  image,
  selected,
  onClick,
}: {
  price: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx("border w-[176px] rounded-[20px] bg-white relative", {
        "border-black border-2": selected,
      })}
      onClick={onClick}
    >
      <img src={image} alt="MonCatcher" width="100%" height={196} />
      {/* <p className="bg-[#D2D2D2] text-sm rounded-full px-2 py-1 w-fit absolute bottom-3 left-3">
        {price} ETH
      </p> */}
    </div>
  );
};

const catchers = [
  {
    image: "https://images.cybertino.io/cybermon/moncatcher/1.png",
    price: "0.1",
    tier: 1,
  },
  {
    image: "https://images.cybertino.io/cybermon/moncatcher/2.png",
    price: "0.2",
    tier: 2,
  },
  {
    image: "https://images.cybertino.io/cybermon/moncatcher/3.png",
    price: "0.3",
    tier: 3,
  },
];

const MonCatchers = ({ successCallback }: { successCallback: () => void }) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [selected, setSelected] = useState<number>(0);

  const { isPending, isSuccess, isError, data, error, mutate } = useMutation({
    mutationFn: (catcher: (typeof catchers)[number]) =>
      apiClient.post("/moncatcher/mint", {
        address,
        tier: catcher.tier,
      }),
    onSuccess: () => {
      successCallback();
    },
  });

  const handleClick = async () => {
    const catcher = catchers[selected];

    const signature = await signMessageAsync({
      message:
        "Welcome to Cyberland! Grab a MonCatcher and start your journey!",
    });

    mutate(catcher);
  };

  return (
    <div className="flex flex-col">
      <div className="text-[72px] leading-[64px] text-[#00000099] font-serif">
        Choose your <b className="text-black">MonCatcher</b> & start the
        journey.
      </div>
      <div className="flex mt-10 w-full justify-between">
        {catchers.map((catcher, idx) => (
          <Card
            key={idx}
            {...catcher}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
      <button
        className="text-sm bg-black px-2 py-1 rounded-full text-white w-fit self-center mt-10 flex items-center gap-x-2"
        onClick={handleClick}
      >
        {isPending && (
          <IconLoader2
            size={20}
            strokeWidth={1}
            color="white"
            className="animate-spin"
          />
        )}
        Go with it!
      </button>
    </div>
  );
};

export default MonCatchers;
