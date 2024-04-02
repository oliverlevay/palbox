import { useData } from "./DataProvider";
import PalCircle from "./PalCircle";
import TopBar from "./TopBar";

export default function Party() {
  const { party } = useData();
  return (
    <div
      style={{
        width: 550,
        height: 144,
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
    >
      <TopBar title="Party" />
      <div className="flex gap-[10px] mt-2 ml-8">
        {party.map((pal, index) => (
          <PalCircle key={index} pal={pal} />
        ))}
      </div>
    </div>
  );
}
