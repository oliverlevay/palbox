import { PALS_PER_BOX } from "@/components/DataProvider";
import { Pal as RealPal, Suitability } from "@/types";

type Pal = RealPal | null;

export function searchPalArray(pals: Pal[], query: string): Pal[] {
  return pals.filter((pal) =>
    pal?.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function sliceByBox(pals: Pal[], activeBox: number): Pal[] {
  return pals.slice((activeBox - 1) * PALS_PER_BOX, activeBox * PALS_PER_BOX);
}

export function fillRestWithNulls(pals: Pal[], size: number): Pal[] {
  return fillWithNulls(pals, size - pals.length);
}

export function fillWithNulls(pals: Pal[], amount: number): Pal[] {
  return [...pals, ...Array(amount).fill(null)];
}

export function countNulls(pals: Pal[]): number {
  return pals.filter((pal) => pal === null).length;
}

export function findPalByName(pals: Pal[], name: string): Pal {
  return pals.find((pal) => pal?.name === name) ?? null;
}

/**
 * Filters pals by types, a pal is included if it has all the types in the types array
 * @param pals
 * @param types
 * @returns
 */

export function filterByTypes(pals: Pal[], types: string[]): Pal[] {
  return pals.filter((pal) => {
    if (!pal) return false;
    return types.every((type) =>
      pal.types.some((palType) => palType.name === type)
    );
  });
}

export function filterBySuitabilities(pals: Pal[], works: Suitability[]) {
  return pals.filter((pal) => {
    if (!pal) return false;
    return works.some((work) =>
      pal.suitability.some(
        (palWork) => palWork.type === work.type && palWork.level === work.level
      )
    );
  });
}

export function filterByLevels(pals: Pal[], levels: [number, number]) {
  return pals.filter(
    (pal) => pal && pal.level >= levels[0] && pal.level <= levels[1]
  );
}
