import { useEffect, useState } from "react";
import Key from "../Key";
import PaginationBall from "./PaginationBall";

const BOX_SIZE = 15;

export default function Pagination() {
  const [activeBox, setActiveBox] = useState(1);
  useEffect(() => {
    if (activeBox < 1) {
      setActiveBox(BOX_SIZE);
    }
    if (activeBox > BOX_SIZE) {
      setActiveBox(1);
    }
  }, [activeBox]);
  return (
    <div
      className="flex gap-3 items-center mt-[11px] ml-[84px] mr-[84px] mb-[21px]"
      onKeyDown={(e) => {
        if (e.key === "q") {
          setActiveBox(activeBox - 1);
        } else if (e.key === "e") {
          setActiveBox(activeBox + 1);
        }
      }}
    >
      <Key className="mr-1">Q</Key>
      {Array.from({ length: BOX_SIZE }).map((_, index) => (
        <PaginationBall
          key={index}
          active={activeBox === index + 1}
          onClick={() => setActiveBox(index + 1)}
        />
      ))}
      <Key className="ml-1">E</Key>
    </div>
  );
}
