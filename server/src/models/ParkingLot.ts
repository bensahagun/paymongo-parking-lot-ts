import { EntryPoint, SlotSize, VehicleType } from "./enums";
import ParkingRate from "./ParkingRate";
import Slot from "./Slot";
import Ticket from "./Ticket";
import Vehicle from "./Vehicle";

const hourInMs = process.env.hourInMs ? Number(process.env.hourInMs) : 3600000;

export class ParkingLotUtils {
  static getHoursDiff(startDate: number, endDate: number) {
    return Math.ceil((endDate - startDate) / hourInMs);
  }

  static validateTicket(ticket: Ticket, ticketHoursValid: number) {
    if (!ticket.exitTimestamp) return true;
    if (ParkingLotUtils.getHoursDiff(ticket.exitTimestamp, Date.now()) <= ticketHoursValid) return true;
    return false;
  }

  static calculateFees(ticket: Ticket, rate: ParkingRate, exitTimeStamp: number) {
    const totalHours = ParkingLotUtils.getHoursDiff(ticket.entryTimestamp, exitTimeStamp);
    const dayInHours = 24;

    if (totalHours <= rate.flatRateHours) return rate.flatRate - ticket.paidAmount;
    if (totalHours < dayInHours)
      return (totalHours - rate.flatRateHours) * rate.hourlyRate + rate.flatRate - ticket.paidAmount;

    return (
      rate.dailyRate * Math.floor(totalHours / dayInHours) +
      rate.hourlyRate * (totalHours % dayInHours) -
      ticket.paidAmount
    );
  }
}

export class ParkingLot {
  tickets: Ticket[];
  slots: Slot[];
  parkingRates: ParkingRate[];
  ticketHoursValid: number;

  constructor(slots?: Slot[], rates?: ParkingRate[], ticketHoursValid?: number) {
    this.slots = slots || [];
    this.parkingRates = rates || [];
    this.tickets = [];
    this.ticketHoursValid = ticketHoursValid || 1;
  }

  addSlot(slot: Slot) {
    this.slots.push(slot);
  }

  addRate(rate: ParkingRate) {
    if (rate.slotSize in this.parkingRates) throw new Error("Slot size has existing rate.");
    this.parkingRates[rate.slotSize] = rate;
  }

  parkVehicle(vehicle: Vehicle, entryPoint: EntryPoint) {
    const ticket = this.getTicket(vehicle.plateNum);

    if (ticket && !ticket.exitTimestamp) {
      throw new Error("You are already parked");
    }

    if (ticket && ParkingLotUtils.validateTicket(ticket, this.ticketHoursValid)) {
      ticket.exitTimestamp = undefined;
      return ticket;
    }

    const slot = this.getParkingSlot(vehicle.vehicleType, entryPoint);
    if (!slot) throw new Error("No available slot");

    const newTicket = new Ticket(vehicle, slot);
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  unparkVehicle(vehicle: Vehicle) {
    const ticket = this.getTicket(vehicle.plateNum);
    if (!ticket) throw new Error("No record found.");

    const exitTimeStamp = Date.now();
    const toPay = ParkingLotUtils.calculateFees(ticket, this.getParkingRate(ticket.slot.slotSize), exitTimeStamp);
    ticket.paidAmount += toPay;
    ticket.exitTimestamp = exitTimeStamp;

    return toPay;
  }

  getParkingRate(slotSize: SlotSize) {
    return this.parkingRates[slotSize];
  }

  getTicket(plateNum: string) {
    return this.tickets.find((ticket) => ticket.vehicle.plateNum === plateNum);
  }

  getParkingSlot(vehicleType: VehicleType, entryPoint: EntryPoint) {
    const occupiedSlots = this.getActiveTickets().map((ticket) => ticket.slot);
    const validSlots = this.slots.filter((slot: Slot) => slot.slotSize >= vehicleType && !occupiedSlots.includes(slot));
    return validSlots.sort((a: Slot, b: Slot) => a.getDistance(entryPoint) - b.getDistance(entryPoint))[0];
  }

  getActiveTickets() {
    return this.tickets.filter(ParkingLotUtils.validateTicket);
  }
}
