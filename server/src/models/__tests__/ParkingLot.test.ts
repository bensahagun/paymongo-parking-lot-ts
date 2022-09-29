import { EntryPoint, VehicleType } from "../enums";
import { ParkingLot } from "../ParkingLot";
import ParkingRate from "../ParkingRate";
import Slot from "../Slot";
import Vehicle from "../Vehicle";
import Ticket from "../Ticket";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const slotsJSON = [
  {
    slotNum: 1,
    slotSize: 0,
    distances: [1, 2, 3],
  },
  {
    slotNum: 2,
    slotSize: 1,
    distances: [1, 3, 2],
  },
  {
    slotNum: 3,
    slotSize: 1,
    distances: [3, 3, 5],
  },
  {
    slotNum: 4,
    slotSize: 0,
    distances: [1, 1, 1],
  },
  {
    slotNum: 5,
    slotSize: 2,
    distances: [2, 2, 1],
  },
];

const parkingRatesJSON = [
  {
    slotSize: 0,
    flatRate: 40,
    hourlyRate: 20,
    dailyRate: 5000,
  },
  {
    slotSize: 1,
    flatRate: 40,
    hourlyRate: 60,
    dailyRate: 5000,
  },
  {
    slotSize: 2,
    flatRate: 40,
    hourlyRate: 100,
    dailyRate: 5000,
  },
];

const hoursToMS = (hr: number) => hr * 3600000;

describe("Parking Lot", () => {
  const parkingLot = new ParkingLot();
  const vehicle1 = new Vehicle("ZKX 571", VehicleType.L);
  const vehicle2 = new Vehicle("ZSP 382", VehicleType.L);
  let ticket1: Ticket;
  let ticket2: Ticket;

  slotsJSON.forEach((slot) => parkingLot.addSlot(new Slot(slot.slotNum, slot.distances, slot.slotSize)));
  parkingRatesJSON.forEach((rate) =>
    parkingLot.addRate(new ParkingRate(rate.slotSize, rate.hourlyRate, rate.dailyRate, rate.flatRate))
  );

  test(`Parking lot should have ${slotsJSON.length} slots`, () => {
    expect(parkingLot.slots.length).toBe(slotsJSON.length);
  });

  test(`Parking lot should have ${parkingRatesJSON.length} slots`, () => {
    expect(parkingLot.parkingRates.length).toBe(parkingRatesJSON.length);
  });

  test("Able to park a  vehicle when parking lot has slot", () => {
    ticket1 = parkingLot.parkVehicle(vehicle1, EntryPoint.A);

    expect(ticket1).toBeInstanceOf(Ticket);
    expect(ticket1.vehicle).toBe(vehicle1);
  });

  test("Should receive a valid ticket", () => {
    expect(ticket1.entryTimestamp).toBeLessThanOrEqual(Date.now());
    expect(ticket1.exitTimestamp).toBeFalsy();
  });

  test("should FAIL to park a vehicle when parking lot is empty", () => {
    const parkAnother = () => {
      ticket2 = parkingLot.parkVehicle(vehicle2, EntryPoint.A);
    };
    expect(parkAnother).toThrowError();
  });

  test("should receive a valid ticket when unparking", () => {
    setTimeout(() => {
      const exitTicket = parkingLot.unparkVehicle(vehicle1);

      expect(exitTicket).toBe(ticket1);
      expect(exitTicket.exitTimestamp).toBeGreaterThan(exitTicket.entryTimestamp);
    }, hoursToMS(1));

    jest.advanceTimersByTime(hoursToMS(1));
  });

  test("should only pay flat rate for first 3 hours", () => {
    const rate = parkingLot.getParkingRate(ticket1.slot.slotSize);
    expect(ticket1.paidAmount).toBe(rate.flatRate);
  });

  test("can REENTER when coming back before 1 hour", () => {
    setTimeout(() => {
      const newTicket = parkingLot.parkVehicle(vehicle1, EntryPoint.B);
      expect(newTicket).toBe(ticket1);
    });
  });
});
