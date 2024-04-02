import { findPalByName } from "./palFilterFunctions";
import pals from "@/public/pals.json";

export const defaultParty = [
  findPalByName(pals, "Beegarde"),
  findPalByName(pals, "Vanwyrm"),
  findPalByName(pals, "Quivern"),
  findPalByName(pals, "Tanzee"),
  null,
];

export const defaultBase = [
  findPalByName(pals, "Dumud"),
  findPalByName(pals, "Lamball"),
  findPalByName(pals, "Cattiva"),
  findPalByName(pals, "Daedream"),
  findPalByName(pals, "Tanzee"),
  findPalByName(pals, "Pengullet"),
  findPalByName(pals, "Tanzee"),
  findPalByName(pals, "Jormuntide Ignis"),
  findPalByName(pals, "Incineram"),
  null,
];
