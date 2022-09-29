import { EntryPoint, SlotSize, VehicleType } from "./enums";
import ParkingRate from "./ParkingRate";
import Slot from "./Slot";
import Ticket from "./Ticket";
import Vehicle from "./Vehicle";

export class ParkingLotUtils {
  static validateTicket(ticket: Ticket, ticketHoursValid: number) {
    if (!ticket.exitTimestamp) return true;
    if (ParkingLotUtils.getHoursDiff(ticket.exitTimestamp, Date.now()) <= ticketHoursValid) return true;
    return false;
  }

  static getHoursDiff(startDate: number, endDate: number) {
    const msInHour = 1000 * 60 * 60;
    // const msInHour = 1000 * 1;
    return Math.ceil(Math.abs(endDate - startDate) / msInHour);
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
    // this.slots = slots.reduce((acc, slot) => {
    //   const key = slot.slotSize;
    //   const currGroup = acc[key] ?? [];

    //   return { ...acc, [key]: [...currGroup, slot] };
    // }, {} as Slots);

    // this.parkingRates = rates.reduce((acc, rate) => {
    //   const key = rate.slotSize;
    //   return { ...acc, [key]: rate };
    // }, {} as ParkingRates);
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

    if (ticket && ParkingLotUtils.validateTicket(ticket, this.ticketHoursValid)) {
      ticket.exitTimestamp = undefined;
      return ticket;
    }

    const slot = this.getParkingSlot(vehicle.vehicleType, entryPoint);
    if (!slot) throw Error("No available slot");

    const newTicket = new Ticket(vehicle, slot);
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  unparkVehicle(vehicle: Vehicle, customTimeStemp?: number) {
    const ticket = this.getTicket(vehicle.plateNum);
    if (!ticket) throw Error("No record found.");

    const exitTimeStamp = customTimeStemp || Date.now();
    const toPay = ParkingLotUtils.calculateFees(ticket, this.getParkingRate(ticket.slot.slotSize), exitTimeStamp);
    ticket.paidAmount += toPay;
    ticket.exitTimestamp = exitTimeStamp;

    return ticket;
  }

  getParkingRate(slotSize: SlotSize) {
    return this.parkingRates[slotSize];
  }

  getTicket(plateNum: string) {
    return this.tickets.find((ticket) => ticket.vehicle.plateNum === plateNum) || false;
  }

  getParkingSlot(size: VehicleType, entryPoint: EntryPoint) {
    const occupiedSlots = this.getActiveTickets().map((ticket) => ticket.slot);
    const validSlots = this.slots.filter((slot: Slot) => slot.slotSize >= size && !occupiedSlots.includes(slot));
    return validSlots.sort((a: Slot, b: Slot) => a.getDistance(entryPoint) - b.getDistance(entryPoint))[0];
  }

  getActiveTickets() {
    return this.tickets.filter(ParkingLotUtils.validateTicket);
  }
}
