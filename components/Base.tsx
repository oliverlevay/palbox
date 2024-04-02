import PalCircle from "./PalCircle";
import { useData } from "./DataProvider";
import TopBar from "./TopBar";

export default function Base() {
  const { base } = useData();
  return (
    <div
      style={{
        width: 550,
        marginTop: 16,
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
    >
      <TopBar title="Base" />
      <div className="flex flex-wrap gap-[10px] gap-y-1  mt-2 ml-8">
        {base.map((pal, index) => (
          <PalCircle
            key={pal ? `${pal?.name}-${index}-${pal?.id}` : `empty-${index}`}
            pal={pal}
          />
        ))}
      </div>
    </div>
  );
}
