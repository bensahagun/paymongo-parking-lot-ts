import { EntryPoint, SlotSize } from "./enums";

export default class Slot {
  slotNum: number;
  slotSize: SlotSize;
  distances: number[];

  constructor(slotNum: number, distances: number[], slotSize: SlotSize) {
    this.slotNum = slotNum;
    this.slotSize = slotSize;
    this.distances = distances;
  }

  getDistance(entryPoint: EntryPoint) {
    return this.distances[entryPoint];
  }
}
