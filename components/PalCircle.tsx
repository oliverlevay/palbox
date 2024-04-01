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
          <p className="absolute right-0 font-bold text-sm tracking-wide">1</p>
          <p className="text-primary font-medium tracking-wide text-center">
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
