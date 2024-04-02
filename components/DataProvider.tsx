import { Pal } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultPals from "@/public/pals.json";
import {
  countNulls,
  fillRestWithNulls,
  fillWithNulls,
  searchPalArray,
  sliceByBox,
} from "@/src/palFilterFunctions";
import { defaultBase, defaultParty } from "@/src/data";

export const BOX_SIZE = 15;
export const PALS_PER_BOX = 30;
export const PARTY_SIZE = 5;

type Data = {
  party: (Pal | null)[];
  box: (Pal | null)[];
  base: (Pal | null)[];
  boxIndex: number;
  updateBoxIndex: (box: number) => void;
  search: (query: string) => void;
  nextBox: () => void;
  prevBox: () => void;
};

const defaultState: Data = {
  party: defaultParty,
  box: defaultPals.slice(0, 30),
  base: defaultBase,
  boxIndex: 1,
  updateBoxIndex: () => {},
  search: () => {},
  nextBox: () => {},
  prevBox: () => {},
};

const DataContext = createContext<Data>(defaultState);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [box, setBox] = useState<(Pal | null)[]>(defaultState.box);
  const [party, setParty] = useState(defaultState.party);
  const [base, setBase] = useState(defaultState.base);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [boxIndex, setBoxIndex] = useState(defaultState.boxIndex);

  const filterBox = useCallback(() => {
    let newBox: (Pal | null)[] = defaultPals;
    if (searchQuery) newBox = searchPalArray(newBox, searchQuery);
    newBox = sliceByBox(newBox, boxIndex);
    if (newBox.length < PALS_PER_BOX)
      newBox = fillRestWithNulls(newBox, PALS_PER_BOX);
    setBox(newBox);
  }, [boxIndex, searchQuery]);

  const filterParty = useCallback(() => {
    let newParty: (Pal | null)[] = defaultState.party;
    if (searchQuery) newParty = searchPalArray(newParty, searchQuery);
    if (newParty.length < PARTY_SIZE)
      newParty = fillWithNulls(newParty, countNulls(defaultState.party));
    setParty(newParty);
  }, [searchQuery]);

  const filterBase = useCallback(() => {
    let newBase: (Pal | null)[] = defaultState.base;
    if (searchQuery) newBase = searchPalArray(newBase, searchQuery);
    if (newBase.length < defaultState.base.length)
      newBase = fillWithNulls(newBase, countNulls(defaultState.base));
    setBase(newBase);
  }, [searchQuery]);

  useEffect(() => {
    filterBox();
    filterParty();
    filterBase();
  }, [filterBox, filterParty, filterBase, boxIndex, searchQuery]);

  return (
    <DataContext.Provider
      value={{
        box,
        party,
        base,
        boxIndex: boxIndex,
        updateBoxIndex: setBoxIndex,
        search: (query: string) => {
          setSearchQuery(query);
          setBoxIndex(1);
        },
        nextBox: () => {
          setBoxIndex((prev) => {
            if (prev + 1 > BOX_SIZE) {
              return 1;
            }
            return prev + 1;
          });
        },
        prevBox: () => {
          setBoxIndex((prev) => {
            if (prev - 1 < 1) {
              return BOX_SIZE;
            }
            return prev - 1;
          });
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
