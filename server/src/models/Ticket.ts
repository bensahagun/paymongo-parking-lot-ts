import Slot from "./Slot";
import Vehicle from "./Vehicle";

export default class Ticket {
  vehicle: Vehicle;
  slot: Slot;
  hoursValid: number;
  paidAmount: number;
  entryTimestamp: number;
  exitTimestamp?: number;

  constructor(vehicle: Vehicle, slot: Slot, hoursValid = 1) {
    this.vehicle = vehicle;
    this.slot = slot;
    this.paidAmount = 0;
    this.entryTimestamp = Date.now();
    this.hoursValid = hoursValid;
  }
}
