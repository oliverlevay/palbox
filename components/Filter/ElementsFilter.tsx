import elements from "@/public/elements.json";
import Image from "next/image";

export default function ElementsFilter() {
  return (
    <div>
      {elements.map((element) => (
        <div key={element.name}>
          <Image
            src={element.image}
            alt={element.name}
            width={48}
            height={48}
          />
          <p>{element.name}</p>
        </div>
      ))}
    </div>
  );
}
