import { SlotSize } from "./enums";

export default class ParkingRate {
  slotSize: SlotSize;
  hourlyRate: number;
  dailyRate: number;
  flatRate: number;
  flatRateHours: number;

  constructor(slotSize: SlotSize, hourlyRate: number, dailyRate: number, flatRate = 40, flatRateHours = 3) {
    this.slotSize = slotSize;
    this.hourlyRate = hourlyRate;
    this.dailyRate = dailyRate;
    this.flatRate = flatRate;
    this.flatRateHours = flatRateHours;
  }
}
