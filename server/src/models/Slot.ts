import { EntryPoint, SlotSize } from "./enums";

export default class Slot {
  slotNum: number;
  distances: number[];
  slotSize: SlotSize;

  constructor(slotNum: number, distances: number[], slotSize: SlotSize) {
    this.slotNum = slotNum;
    this.distances = distances;
    this.slotSize = slotSize;
  }

  getDistance(entryPoint: EntryPoint) {
    return this.distances[entryPoint];
  }
}
