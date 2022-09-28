import { SlotSize } from "./enums";

export default class ParkingRate {
  slotSize: SlotSize;
  flatRate: number;
  hourlyRate: number;
  dailyRate: number;

  constructor(slotSize: SlotSize, flatRate: number, hourlyRate: number, dailyRate: number) {
    this.slotSize = slotSize;
    this.flatRate = flatRate;
    this.hourlyRate = hourlyRate;
    this.dailyRate = dailyRate;
  }
}
