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
  filterByLevels,
  filterBySuitabilities,
  filterByTypes,
  searchPalArray,
  sliceByBox,
} from "@/src/palFilterFunctions";
import { defaultBase, defaultParty } from "@/src/data";

export const BOX_SIZE = 15;
export const PALS_PER_BOX = 30;
export const PARTY_SIZE = 5;
export const FILTERS = 3;

type Data = {
  party: (Pal | null)[];
  box: (Pal | null)[];
  filterIndex: number;
  base: (Pal | null)[];
  boxIndex: number;
  levelFilter: [number, number];
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
  setLevelFilter: (levels: [number, number]) => void;
  nextFilter: () => void;
  prevFilter: () => void;
  setFilterIndex: (index: number) => void;
};

const defaultState: Data = {
  party: defaultParty,
  box: defaultPals.slice(0, 30),
  filterIndex: 1,
  base: defaultBase,
  boxIndex: 1,
  levelFilter: [1, 50],
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
  setLevelFilter: () => {},
  nextFilter: () => {},
  prevFilter: () => {},
  setFilterIndex: () => {},
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
  const [filterIndex, setFilterIndex] = useState(defaultState.filterIndex);
  const [party, setParty] = useState(defaultState.party);
  const [base, setBase] = useState(defaultState.base);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [worksFilters, setWorksFilters] = useState<Suitability[]>([]);
  const [levelFilter, setLevelFilter] = useState<[number, number]>(
    defaultState.levelFilter
  );
  const [boxIndex, setBoxIndex] = useState(defaultState.boxIndex);

  const filterBox = useCallback(() => {
    console.log("filtering box");
    let newBox: (Pal | null)[] = defaultPals;
    if (searchQuery) newBox = searchPalArray(newBox, searchQuery);
    if (typeFilters.length > 0) newBox = filterByTypes(newBox, typeFilters);
    if (worksFilters.length > 0)
      newBox = filterBySuitabilities(newBox, worksFilters);
    newBox = filterByLevels(newBox, levelFilter);

    newBox = sliceByBox(newBox, boxIndex);
    if (newBox.length < PALS_PER_BOX)
      newBox = fillRestWithNulls(newBox, PALS_PER_BOX);
    setBox(newBox);
  }, [boxIndex, searchQuery, typeFilters, worksFilters, levelFilter]);

  const filterParty = useCallback(() => {
    let newParty: (Pal | null)[] = defaultState.party;
    if (searchQuery) newParty = searchPalArray(newParty, searchQuery);
    if (typeFilters.length > 0) newParty = filterByTypes(newParty, typeFilters);
    if (worksFilters.length > 0)
      newParty = filterBySuitabilities(newParty, worksFilters);
    newParty = filterByLevels(newParty, levelFilter);

    if (newParty.length < PARTY_SIZE)
      newParty = fillWithNulls(newParty, countNulls(defaultState.party));
    setParty(newParty);
  }, [searchQuery, typeFilters, worksFilters, levelFilter]);

  const filterBase = useCallback(() => {
    let newBase: (Pal | null)[] = defaultState.base;
    if (searchQuery) newBase = searchPalArray(newBase, searchQuery);
    if (typeFilters.length > 0) newBase = filterByTypes(newBase, typeFilters);
    if (worksFilters.length > 0)
      newBase = filterBySuitabilities(newBase, worksFilters);
    newBase = filterByLevels(newBase, levelFilter);

    if (newBase.length < defaultState.base.length)
      newBase = fillWithNulls(newBase, countNulls(defaultState.base));
    setBase(newBase);
  }, [searchQuery, typeFilters, worksFilters, levelFilter]);

  useEffect(() => {
    filterBox();
    filterParty();
    filterBase();
  }, [filterBox, filterParty, filterBase]);

  return (
    <DataContext.Provider
      value={{
        box,
        party,
        base,
        boxIndex,
        levelFilter,
        filterIndex,

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
        setLevelFilter: (levels) => {
          setLevelFilter(levels);
        },
        nextFilter: () => {
          setFilterIndex((prev) => {
            if (prev + 1 > FILTERS) return 1;
            return prev + 1;
          });
        },
        prevFilter: () => {
          setFilterIndex((prev) => {
            if (prev - 1 < 1) return FILTERS;
            return prev - 1;
          });
        },
        setFilterIndex: (index) => {
          setFilterIndex(index);
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
