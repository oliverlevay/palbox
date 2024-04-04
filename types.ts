/* export type TypeName =
  | "neutral"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "ground"
  | "dark"
  | "dragon"; */

export interface Pal {
  id: number;
  level: number;
  key: string;
  image: string;
  name: string;
  wiki: string;
  types: Type[];
  imageWiki: string;
  suitability: Suitability[];
  drops: string[];
  aura: Aura;
  description: string;
  skills: Skill[];
  stats: Stats;
  asset: string;
  genus: string;
  rarity: number;
  price: number;
  size: string;
  maps: Maps;
  breeding: Breeding;
}

export interface Type {
  name: string;
  image: string;
}

export interface Suitability {
  type: string;
  image?: string;
  level: number;
}

export interface Aura {
  name: string;
  description: string;
  tech?: string | null;
}

export interface Skill {
  level: number;
  name: string;
  type: string;
  cooldown: number;
  power: number;
  description: string;
}

export interface Stats {
  hp: number;
  attack: Attack;
  defense: number;
  speed: Speed;
  stamina: number;
  support: number;
  food: number;
}

export interface Attack {
  melee: number;
  ranged: number;
}

export interface Speed {
  ride: number;
  run: number;
  walk: number;
}

export interface Maps {
  day?: string;
  night?: string;
}

export interface Breeding {
  rank: number;
  order: number;
  child_eligble: boolean;
  male_probability: number;
}
