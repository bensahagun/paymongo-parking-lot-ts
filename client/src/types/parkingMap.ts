import { SlotSize } from "./enums";
import { Slot } from "./slot";

export type ParkingMap = {
  [key in SlotSize]?: Slot[];
};
