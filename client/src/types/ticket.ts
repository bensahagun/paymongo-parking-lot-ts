import { Slot } from "./slot";
import { Vehicle } from "./vehicle";

export type Ticket = {
  vehicle: Vehicle;
  slot: Slot;
  paidAmount: number;
  entryTimestamp: number;
  exitTimestamp?: number;
};
