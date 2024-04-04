import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useData } from "./DataProvider";
import InputField from "./InputField";

export default function LevelSlider({ className }: { className?: string }) {
  const { levelFilter, setLevelFilter } = useData();
  return (
    <div
      className={`w-[300px] border-2 border-[#303636] p-2 pb-4 ${
        className ?? ""
      }`}
    >
      <p className="text-primary text-xl mb-2 text-center">Level Filter</p>

      <div className="flex justify-between mb-4">
        <InputField
          onChange={(text) => {
            setLevelFilter([parseInt(text), levelFilter[1]]);
          }}
          type="number"
          value={levelFilter[0].toString()}
          className="w-16"
        />
        <InputField
          onChange={(text) => {
            setLevelFilter([levelFilter[0], parseInt(text)]);
          }}
          type="number"
          value={levelFilter[1].toString()}
          className="w-16 text-right"
        />
      </div>
      <RangeSlider
        min={1}
        max={50}
        step={1}
        value={levelFilter}
        onInput={setLevelFilter}
      />
    </div>
  );
}
