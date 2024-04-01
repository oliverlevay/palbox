import Image from "next/image";
import { Archivo_Narrow } from "next/font/google";
import Background from "@/components/Background";
import Party from "@/components/Party";
import Box from "@/components/Box/Box";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col pt-4 ${archivoNarrow.className}`}
    >
      <div className="z-10">
        <Party />
        <Box />
      </div>
      <Background />
    </main>
  );
}
