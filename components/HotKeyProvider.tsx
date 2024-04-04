import { useEffect } from "react";
import { useData } from "./DataProvider";

export default function HotKeyProvider() {
  const { nextBox, prevBox, prevFilter, nextFilter } = useData();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName.toLowerCase();
      if (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select"
      ) {
        return;
      }

      if (event.key === "q") {
        prevBox();
      } else if (event.key === "e") {
        nextBox();
      }

      if (event.key === "a") {
        prevFilter();
      } else if (event.key === "d") {
        nextFilter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
