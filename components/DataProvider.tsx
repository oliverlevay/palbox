import { Pal, Suitability } from "@/types";
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
  filterBySuitabilities,
  filterByTypes,
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
  addTypeFilter: (type: string) => void;
  removeTypeFilter: (type: string) => void;
  typeFilterIsActive: (type: string) => boolean;
  addWorksFilter: (works: Suitability) => void;
  removeWorksFilter: (works: Suitability) => void;
  worksFilterIsActive: (works: Suitability) => boolean;
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
  addTypeFilter: () => {},
  removeTypeFilter: () => {},
  typeFilterIsActive: () => false,
  addWorksFilter: () => {},
  removeWorksFilter: () => {},
  worksFilterIsActive: () => false,
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
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [worksFilters, setWorksFilters] = useState<Suitability[]>([]);
  const [boxIndex, setBoxIndex] = useState(defaultState.boxIndex);

  const filterBox = useCallback(() => {
    let newBox: (Pal | null)[] = defaultPals;
    if (searchQuery) newBox = searchPalArray(newBox, searchQuery);
    if (typeFilters.length > 0) newBox = filterByTypes(newBox, typeFilters);
    if (worksFilters.length > 0)
      newBox = filterBySuitabilities(newBox, worksFilters);
    newBox = sliceByBox(newBox, boxIndex);
    if (newBox.length < PALS_PER_BOX)
      newBox = fillRestWithNulls(newBox, PALS_PER_BOX);
    setBox(newBox);
  }, [boxIndex, searchQuery, typeFilters, worksFilters]);

  const filterParty = useCallback(() => {
    let newParty: (Pal | null)[] = defaultState.party;
    if (searchQuery) newParty = searchPalArray(newParty, searchQuery);
    if (typeFilters.length > 0) newParty = filterByTypes(newParty, typeFilters);
    if (worksFilters.length > 0)
      newParty = filterBySuitabilities(newParty, worksFilters);
    if (newParty.length < PARTY_SIZE)
      newParty = fillWithNulls(newParty, countNulls(defaultState.party));
    setParty(newParty);
  }, [searchQuery, typeFilters, worksFilters]);

  const filterBase = useCallback(() => {
    let newBase: (Pal | null)[] = defaultState.base;
    if (searchQuery) newBase = searchPalArray(newBase, searchQuery);
    if (typeFilters.length > 0) newBase = filterByTypes(newBase, typeFilters);
    if (worksFilters.length > 0)
      newBase = filterBySuitabilities(newBase, worksFilters);
    if (newBase.length < defaultState.base.length)
      newBase = fillWithNulls(newBase, countNulls(defaultState.base));
    setBase(newBase);
  }, [searchQuery, typeFilters, worksFilters]);

  useEffect(() => {
    filterBox();
    filterParty();
    filterBase();
  }, [filterBox, filterParty, filterBase, boxIndex, searchQuery, typeFilters]);

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
        addTypeFilter: (type) => {
          setTypeFilters((prev) => {
            if (prev.includes(type)) return prev;
            return [...prev, type];
          });
        },
        removeTypeFilter: (type) => {
          setTypeFilters((prev) => {
            return prev.filter((t) => t !== type);
          });
        },
        typeFilterIsActive: (type) => typeFilters.includes(type),
        addWorksFilter: (works) => {
          setWorksFilters((prev) => {
            if (prev.includes(works)) return prev;
            return [...prev, works];
          });
        },
        removeWorksFilter: (works) => {
          setWorksFilters((prev) => {
            return prev.filter(
              (w) => w.type !== works.type || w.level !== works.level
            );
          });
        },
        worksFilterIsActive: (works) => {
          return worksFilters.some(
            (w) => w.type === works.type && w.level === works.level
          );
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
