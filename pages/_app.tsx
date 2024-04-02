import DataProvider from "@/components/DataProvider";
import HotKeyProvider from "@/components/HotKeyProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <HotKeyProvider />
      <Component {...pageProps} />
    </DataProvider>
  );
}
