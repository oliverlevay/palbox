import works from "@/public/works.json";
import Image from "next/image";
import { useData } from "../DataProvider";
import PaginationBall from "../PaginationBall";

export default function WorksFilter() {
  return (
    <div className="flex flex-col gap-3">
      {works.map((work) => {
        return <Work work={work} key={work.name} />;
      })}
    </div>
  );
}

export const Work = ({ work }: { work: { name: string; image: string } }) => {
  const { addWorksFilter, removeWorksFilter, worksFilterIsActive } = useData();

  const toggleWorksFilter = (level: number) => {
    if (
      worksFilterIsActive({
        type: work.name,
        level,
      })
    ) {
      removeWorksFilter({
        type: work.name,
        level,
      });
    } else {
      addWorksFilter({
        type: work.name,
        level,
      });
    }
  };

  return (
    <div
      key={work.name}
      className={`flex items-center gap-4 border-2 border-[#303636] 
      w-[300px] pl-4 pr-4 pt-2 pb-2
      `}
    >
      <Image src={work.image} alt={work.name} width={40} height={40} />
      <p className="font-medium text-2xl capitalize">{work.name}</p>
      <div className="flex gap-3 ml-auto">
        <PaginationBall
          active={worksFilterIsActive({
            type: work.name,
            level: 1,
          })}
          onClick={() => {
            toggleWorksFilter(1);
          }}
        />
        <PaginationBall
          active={worksFilterIsActive({
            type: work.name,
            level: 2,
          })}
          onClick={() => {
            toggleWorksFilter(2);
          }}
        />
        <PaginationBall
          active={worksFilterIsActive({
            type: work.name,
            level: 3,
          })}
          onClick={() => {
            toggleWorksFilter(3);
          }}
        />
        <PaginationBall
          active={worksFilterIsActive({
            type: work.name,
            level: 4,
          })}
          onClick={() => {
            toggleWorksFilter(4);
          }}
        />
      </div>
    </div>
  );
};
