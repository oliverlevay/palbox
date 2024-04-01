import { Pal } from "@/types";
import PalCircle from "../PalCircle";
import pals from "@/public/pals.json";
import TopBar from "./TopBar";
import Pagination from "./Pagination";

const box: (Pal | null)[] = pals.slice(0, 30);

export default function Box() {
  return (
    <div
      style={{
        width: 550,
        margin: "0 auto",
        marginTop: 16,
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
    >
      <TopBar />
      <Pagination />
      <div className="flex flex-wrap gap-[10px] gap-y-1  mt-2 ml-8">
        {box.map((pal, index) => (
          <PalCircle key={index} pal={pal} />
        ))}
      </div>
    </div>
  );
}
