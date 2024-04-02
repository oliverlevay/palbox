import PalCircle from "../PalCircle";
import Pagination from "../Pagination";
import { BOX_SIZE, useData } from "../DataProvider";
import TopBar from "../TopBar";
import SearchBar from "./SearchBar";

export default function Box() {
  const {
    box,
    boxIndex,
    updateBoxIndex: setActiveBox,
    prevBox,
    nextBox,
  } = useData();
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
      <TopBar title="Box">
        <div className="flex items-center pt-1 pb-1 pl-2 pr-2 w-[203px] bg-lightGreyBackground h-full">
          <SearchBar />
        </div>
      </TopBar>
      <Pagination
        activeIndex={boxIndex}
        leftKey="Q"
        rightKey="E"
        onCircleClick={setActiveBox}
        size={BOX_SIZE}
        onLeft={prevBox}
        onRight={nextBox}
      />
      <div className="flex flex-wrap gap-[10px] gap-y-1  mt-2 ml-8">
        {box.map((pal, index) => (
          <PalCircle
            key={pal ? `${pal?.name}-${index}-${pal?.id}` : `empty-${index}`}
            pal={pal}
          />
        ))}
      </div>
    </div>
  );
}
