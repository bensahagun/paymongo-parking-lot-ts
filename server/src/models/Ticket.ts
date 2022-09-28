import Slot from "./Slot";
import Vehicle from "./Vehicle";

export default class Ticket {
  id: string;
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
    this.id = `${vehicle.plateNum}-${slot.slotSize}-${this.entryTimestamp}`;
  }

  isActive(returnThreshold: number) {
    if (!this.exitTimestamp) return true;
    if (getHoursDiff(this.entryTimestamp, this.exitTimestamp) <= returnThreshold) return true;
    return false;
  }
}
