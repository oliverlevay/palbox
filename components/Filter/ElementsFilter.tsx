import elements from "@/public/elements.json";
import Image from "next/image";
import { useData } from "../DataProvider";
import LevelSlider from "../LevelSlider";

export default function ElementsFilter() {
  return (
    <div className="flex flex-col gap-4">
      <LevelSlider />
      {elements.map((element) => {
        return <Element element={element} key={element.name} />;
      })}
    </div>
  );
}

export const Element = ({
  element,
}: {
  element: { name: string; image: string };
}) => {
  const { addTypeFilter, removeTypeFilter, typeFilterIsActive } = useData();
  return (
    <button
      key={element.name}
      className={`flex items-center gap-14 border-2 border-[#303636] 
      w-[300px] pl-4 pr-4 pt-2 pb-2 
      hover:bg-darkerBlue
      ${typeFilterIsActive(element.name) ? "bg-darkerBlue" : ""}`}
      onClick={() => {
        if (typeFilterIsActive(element.name)) {
          removeTypeFilter(element.name);
        } else {
          addTypeFilter(element.name);
        }
      }}
    >
      <Image src={element.image} alt={element.name} width={48} height={48} />
      <p className="text-primary font-medium text-2xl capitalize">
        {element.name}
      </p>
    </button>
  );
};
