import { SlotSize } from "./enums";
import { Ticket } from "./ticket";

export type Slot = {
  slotNum: number;
  slotSize: SlotSize;
  distances: number[];
  ticket: Ticket;
};
