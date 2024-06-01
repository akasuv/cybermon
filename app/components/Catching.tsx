import { IconParachute } from "@tabler/icons-react";
import Image from "next/image";

const Catching = () => {
  return (
    <div>
      <p className="text-[72px] leading-[64px] font-serif">Catching...</p>
      <p className="text-xs font-light mt-6">
        feed gas when your Cybermon is hungry/boring/dying…feed gas when your
        Cybermon is hungry/boring/dying…feed gas when your Cybermon is
        hungry/boring/dying…
      </p>
      <div className="bg-white border-[1px] rounded-2xl shadow h-[50px] flex items-center gap-x-3 px-3 mt-10">
        <IconParachute stroke={2} color="#0C9B00" />
        <p className="grow">Interact With Dapps</p>
        <button
          className="text-sm bg-black px-4 py-1 rounded-full text-white w-fit"
          onClick={() => {
            window.open("https://cyber.co/ecosystem");
          }}
        >
          Explore Cyberland
        </button>
      </div>
      <Image src="/catching.gif" width={600} height={200} alt="catching-gif" />
    </div>
  );
};

export default Catching;
