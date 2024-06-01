import CybermonCard from "./CybermonCard";

const Explore = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <p className="text-[72px] leading-[64px] font-serif tracking-tighter">
        Explore Cyberland
      </p>
      <p className="text-xs font-light">
        feed gas when your Cybermon is hungry/boring/dying…feed gas when your
        Cybermon is hungry/boring/dying…feed gas when your Cybermon is
        hungry/boring/dying…
      </p>
      <div className="w-full flex justify-center">
        <CybermonCard />
      </div>
    </div>
  );
};

export default Explore;
