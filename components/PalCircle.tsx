import { Pal } from "@/types";
import Image from "next/image";

export default function PalCircle({ pal }: { pal: Pal | null }) {
  return (
    <div className="relative flex flex-col h-[89px]">
      <div className="relative rounded-full w-[70px] h-[70px] bg-[#23272C] border-2 border-[#303636] overflow-hidden">
        {pal && (
          <>
            <Image
              alt={pal.name}
              src={pal.image}
              width={64}
              height={64}
              quality={100}
              className="object-cover absolute top-[2px] left-[1px]"
            />
          </>
        )}
      </div>
      {pal && (
        <>
          <p
            className="absolute font-bold text-sm tracking-wide"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "2px 4px",
              borderRadius: "4px",
              right: "-8px",
              top: "-8px",
            }}
          >
            Lv.{pal.level}
          </p>
          <p className="text-primary font-medium tracking-wide text-center max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap">
            {pal.name}
          </p>
          <div className="flex absolute bottom-6 right-0">
            {pal.types.map((type) => (
              <Image
                key={type.name}
                alt={type.name}
                src={type.image}
                width={16}
                height={16}
                quality={100}
                className="object-cover"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
