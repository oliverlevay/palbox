import { PALS_PER_BOX } from "@/components/DataProvider";
import { Pal as RealPal } from "@/types";

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
