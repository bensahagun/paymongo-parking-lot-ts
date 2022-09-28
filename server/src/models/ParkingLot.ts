import { getHoursDiff } from "../utils/getHoursDiff";
import { EntryPoint, SlotSize, VehicleType } from "./enums";
import ParkingRate from "./ParkingRate";
import Slot from "./Slot";
import Ticket from "./Ticket";
import Vehicle from "./Vehicle";

type Slots = {
  [key in SlotSize]: Slot[];
};

type ParkingRates = {
  [key in SlotSize]: ParkingRate;
};

export class ParkingLot {
  tickets: Ticket[];
  slots: Slots;
  parkingRates: ParkingRates;
  ticketHoursValid: number;

  constructor(slots: Slot[], rates: ParkingRate[], ticketHoursValid = 1) {
    this.slots = slots.reduce((acc, slot) => {
      const key = slot.slotSize;
      const currGroup = acc[key] ?? [];

      return { ...acc, [key]: [...currGroup, slot] };
    }, {} as Slots);

    this.parkingRates = rates.reduce((acc, rate) => {
      const key = rate.slotSize;
      return { ...acc, [key]: rate };
    }, {} as ParkingRates);

    this.tickets = [];
    this.ticketHoursValid = ticketHoursValid;
  }

  addSlot(slot: Slot) {
    this.slots[slot.slotSize].push(slot);
  }

  addRate(rate: ParkingRate) {
    if (rate.slotSize in this.parkingRates) return false;
    this.parkingRates[rate.slotSize] = rate;
  }

  parkVehicle(vehicle: Vehicle, entryPoint: EntryPoint) {
    const ticket = this.getTicket(vehicle);

    if (ticket && this.validateTicket(ticket)) {
      ticket.exitTimestamp = undefined;
      return ticket;
    }

    const slot = this.getParkingSlot(vehicle.vehicleType, entryPoint);
    if (!slot) throw Error("No available slot");

    const newTicket = new Ticket(vehicle, slot);
    this.tickets.push(newTicket);
    return newTicket;
  }

  unparkVehicle(ticket: Ticket) {
    var fee = 40;
    return fee;
  }

  getTicket(vehicle: Vehicle) {
    return this.tickets.find((ticket) => ticket.vehicle.plateNum === vehicle.plateNum) || false;
  }

  validateTicket(ticket: Ticket) {
    if (!ticket.exitTimestamp) return true;
    if (getHoursDiff(ticket.entryTimestamp, ticket.exitTimestamp) <= this.ticketHoursValid) return true;
    return false;
  }

  getParkingSlot(size: VehicleType, entryPoint: EntryPoint) {
    const occupiedSlots = this.getActiveTickets().map((ticket) => ticket.slot);
    const validSlots = Object.values(this.slots)
      .flat()
      .filter((slot: Slot) => slot.slotSize >= size && !occupiedSlots.includes(slot));
    return validSlots.sort((a: Slot, b: Slot) => a.distances[entryPoint] - b.distances[entryPoint])[0];
  }

  getActiveTickets() {
    return this.tickets.filter(this.validateTicket);
  }

  getMap() {}
}
