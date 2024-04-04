import Image from "next/image";
import { Archivo_Narrow } from "next/font/google";
import Background from "@/components/Background";
import Party from "@/components/Party";
import Box from "@/components/Box/Box";
import { useData } from "@/components/DataProvider";
import Base from "@/components/Base";
import Filter from "@/components/Filter";
import Credits from "@/components/Credits";
import Head from "next/head";

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col pt-4 ${archivoNarrow.className}`}
    >
      <Head>
        <title>PALBOX UI DEMO</title>
      </Head>
      <div className="flex justify-center z-10 gap-10">
        <Filter />
        <div className="flex flex-col gap-4">
          <Party />
          <Box />
          <Base />
        </div>
        <div
          style={{
            width: 384,
          }}
        >
          <Credits />
        </div>
      </div>
      <Background />
    </main>
  );
}
