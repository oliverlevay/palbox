import { useEffect } from "react";
import { useData } from "./DataProvider";

export default function HotKeyProvider() {
  const { nextBox, prevBox } = useData();
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
