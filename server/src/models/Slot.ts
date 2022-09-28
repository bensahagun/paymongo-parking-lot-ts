import { EntryPoint, SlotSize } from "./enums";

export default class Slot {
  distances: number[];
  slotSize: SlotSize;

  constructor(distances: number[], slotSize: SlotSize) {
    this.distances = distances;
    this.slotSize = slotSize;
  }

  getDistance(entryPoint: EntryPoint) {
    return this.distances[entryPoint];
  }
}
