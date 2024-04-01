import Image from "next/image";
import background from "../public/images/palworld-background.png";

export default function Background() {
  return (
    <Image
      alt="Background Pal World"
      src={background}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}
