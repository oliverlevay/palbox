import { Pal } from "@/types";
import PalCircle from "./PalCircle";
import pals from "@/public/pals.json";

const party: (Pal | null)[] = [pals[0], pals[1], pals[2], pals[3], null];

export default function Party() {
  return (
    <div
      style={{
        width: 550,
        height: 144,
        margin: "0 auto",
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
    >
      <div className="h-[30px] w-full bg-[#485654] pl-4 relative">
        {/* Circles in the corners */}
        <div className="absolute top-[-1px] left-[-1px] w-1 h-1 bg-[white] opacity-40 rounded-full" />
        <div className="absolute bottom-[-1px] left-[-1px] w-1 h-1 bg-[white] opacity-40 rounded-full" />
        <div className="absolute top-[-1px] right-[-1px] w-1 h-1 bg-[white] opacity-40 rounded-full" />
        <div className="absolute bottom-[-1px] right-[-1px] w-1 h-1 bg-[white] opacity-40 rounded-full" />
        <p className="text-primary font-medium text-xl tracking-wide">Party</p>
      </div>
      <div className="flex gap-[10px] mt-2 ml-8">
        {party.map((pal, index) => (
          <PalCircle key={index} pal={pal} />
        ))}
      </div>
    </div>
  );
}
