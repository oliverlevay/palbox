import { useData } from "./DataProvider";
import TopBar from "./TopBar";
import Pagination from "./Pagination";
import ElementsFilter from "./Filter/ElementsFilter";
import WorksFilter from "./Filter/WorksFilter";

const filters = [
  <ElementsFilter key="elements-filter" />,
  <WorksFilter key="works-filter" />,
  <div key="placeholder-2" />,
];

const names = ["Element", "Work Suitability", "Passive Skills"];

export default function Filter() {
  const { setFilterIndex, filterIndex, prevFilter, nextFilter } = useData();
  return (
    <div
      style={{
        width: 384,
        margin: "0",
        padding: "0 3px",
        backgroundColor: "rgba(22, 25, 24, 0.95)",
        boxShadow: "0px 0px 6px 6px rgba(22, 25, 24, 0.95)",
      }}
      className="flex flex-col items-center"
    >
      <TopBar title={`Filter - ${names[filterIndex - 1]}`} />
      <Pagination
        size={3}
        activeIndex={filterIndex}
        onCircleClick={setFilterIndex}
        onLeft={() => prevFilter()}
        onRight={() => nextFilter()}
        leftKey="A"
        rightKey="D"
      />
      {filters[filterIndex - 1]}
    </div>
  );
}
