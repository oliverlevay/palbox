import Key from "./Key";
import PaginationBall from "./PaginationBall";

export default function Pagination({
  size,
  activeIndex,
  onCircleClick,
  onLeft,
  onRight,
  leftKey,
  rightKey,
}: {
  size: number;
  activeIndex: number;
  onCircleClick: (index: number) => void;
  onLeft: () => void;
  onRight: () => void;
  leftKey: string;
  rightKey: string;
}) {
  return (
    <div className="flex gap-3 items-center mt-[11px] ml-[84px] mr-[84px] mb-[21px]">
      <Key className="mr-1" onClick={onLeft}>
        {leftKey}
      </Key>
      {Array.from({ length: size }).map((_, index) => (
        <PaginationBall
          key={index}
          active={activeIndex === index + 1}
          onClick={() => onCircleClick(index + 1)}
        />
      ))}
      <Key className="ml-1" onClick={onRight}>
        {rightKey}
      </Key>
    </div>
  );
}
