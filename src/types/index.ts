import { Datum } from "node-persist";

export interface StorageItem extends Datum {
    description: string;
    phase: number;
    phaseDate?: Date;
  }