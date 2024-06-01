import Unrevealed from "./Unrevealed";

const Catched = ({
  tx,
  successCallback,
  ts,
}: {
  ts: number;
  tx: string;
  successCallback: () => void;
}) => {
  return (
    <div className="flex flex-col gap-y-10">
      <p className="text-[72px] leading-[64px] font-serif">Catched!</p>
      <div className="w-full flex justify-center">
        <Unrevealed ts={ts} tx={tx} successCallback={successCallback} />
      </div>
    </div>
  );
};

export default Catched;
