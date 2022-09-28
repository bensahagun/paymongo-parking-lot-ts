import Slot from "./Slot";
import Vehicle from "./Vehicle";

export default class Ticket {
  vehicle: Vehicle;
  slot: Slot;
  paidAmount: number;
  entryTimestamp: number;
  exitTimestamp?: number;

  constructor(vehicle: Vehicle, slot: Slot) {
    this.vehicle = vehicle;
    this.slot = slot;
    this.paidAmount = 0;
    this.entryTimestamp = Date.now();
    this.exitTimestamp = undefined;
  }
}
