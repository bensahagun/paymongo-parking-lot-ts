import { EntryPoint, SlotSize, VehicleType } from "../enums";
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
    distances: [2, 2, 3],
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
let parkingLot: ParkingLot;

const initParkingLot = () => {
  parkingLot = new ParkingLot();
  slotsJSON.forEach((slot) => parkingLot.addSlot(new Slot(slot.slotNum, slot.distances, slot.slotSize)));
  parkingRatesJSON.forEach((rate) =>
    parkingLot.addRate(new ParkingRate(rate.slotSize, rate.hourlyRate, rate.dailyRate, rate.flatRate))
  );
};

describe("Parking lot init", () => {
  beforeAll(initParkingLot);

  test(`Parking lot should have ${slotsJSON.length} slots`, () => {
    expect(parkingLot.slots.length).toBe(slotsJSON.length);
  });

  test(`Parking lot should have ${parkingRatesJSON.length} slots`, () => {
    expect(parkingLot.parkingRates.length).toBe(parkingRatesJSON.length);
  });

  test("should not accept another rate for same SIZE", () => {
    expect(() => {
      parkingLot.addRate(new ParkingRate(SlotSize.SP, 50));
    }).toThrowError();
  });
});

describe("Parking SMALL cars to nearest spot", () => {
  beforeAll(initParkingLot);
  const vehicle1 = new Vehicle("SMOL 12", VehicleType.S);
  const vehicle2 = new Vehicle("SMOL 34", VehicleType.S);
  const vehicle3 = new Vehicle("SMOL 56", VehicleType.S);

  it("should park on nearest spot", () => {
    const ticket = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.slot).toBe(parkingLot.slots[1]);
  });

  it("should park on next nearest spot", () => {
    const ticket = parkingLot.parkVehicle(vehicle2, EntryPoint.A);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.slot).toBe(parkingLot.slots[3]);
  });

  it("should park on next nearest spot again", () => {
    const ticket = parkingLot.parkVehicle(vehicle3, EntryPoint.A);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.slot).toBe(parkingLot.slots[0]);
  });
});

describe("Parking SMALL, MEDIUM and LARGE cars to nearest spot", () => {
  beforeAll(initParkingLot);
  const vehicle1 = new Vehicle("SMOL 12", VehicleType.S);
  const vehicle2 = new Vehicle("MED 342", VehicleType.M);
  const vehicle3 = new Vehicle("LRG 562", VehicleType.L);

  it("should park small car on nearest spot", () => {
    const ticket = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.slot).toBe(parkingLot.slots[1]);
  });

  it("should park medium car on = nearest spot", () => {
    const ticket = parkingLot.parkVehicle(vehicle2, EntryPoint.C);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.slot).toBe(parkingLot.slots[4]);
  });

  it("should not be able to park large car", () => {
    expect(() => {
      parkingLot.parkVehicle(vehicle3, EntryPoint.B);
    }).toThrowError();
  });

  it("parking lot should have 2 active ticket", () => {
    expect(parkingLot.getActiveTickets().length).toBe(2);
  });
});

describe("Parking with reentry after 1 hour", () => {
  beforeAll(initParkingLot);
  const vehicle = new Vehicle("MED 342", VehicleType.M);
  let ticket: Ticket;

  it("should receive a valid ticket", () => {
    ticket = parkingLot.parkVehicle(vehicle, EntryPoint.C);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.paidAmount).toBeFalsy();
  });

  it("should compute correct charges after 5.5 hours", () => {
    const hoursInMSStay = hoursToMS(5.5);
    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle);
      expect(charge).toBe(340); // uses slot #5 -> 40 + (100*3)
    }, hoursInMSStay);
    jest.advanceTimersByTime(hoursInMSStay);
  });

  it("should receive new ticket after 1.2hrs", () => {
    const hoursInMSStay = hoursToMS(1.2);
    setTimeout(() => {
      const ticket = parkingLot.parkVehicle(vehicle, EntryPoint.B);
      expect(ticket).not.toBe(Ticket);
      expect(ticket.paidAmount).toBeFalsy();
    }, hoursInMSStay);
    jest.advanceTimersByTime(hoursInMSStay);
  });

  it("should not unpark with no valid ticket", () => {
    expect(() => {
      parkingLot.unparkVehicle(new Vehicle("NOT 123", VehicleType.S));
    }).toThrowError();
  });
});

describe("Parking over 24 hours", () => {
  beforeEach(initParkingLot);
  const vehicle1 = new Vehicle("ABC 123", VehicleType.L);
  const vehicle2 = new Vehicle("SMOL 12", VehicleType.S);

  it("should pay the daily rate for staying 24hrs", () => {
    const ticket1 = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
    const rate = parkingLot.getParkingRate(ticket1.slot.slotSize);

    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle1);
      expect(charge).toBe(rate.dailyRate);
    }, hoursToMS(24));
    jest.advanceTimersByTime(hoursToMS(24));
  });

  it("should pay the daily rate + 1hr rate for 25hrs stay", () => {
    const ticket1 = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
    const rate = parkingLot.getParkingRate(ticket1.slot.slotSize);
    const hoursInMSStay = hoursToMS(25);

    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle1);
      expect(charge).toBe(rate.dailyRate + rate.hourlyRate);
    }, hoursInMSStay);
    jest.advanceTimersByTime(hoursInMSStay);
  });

  it("should 2x daily rate for 48hr stay", () => {
    const ticket1 = parkingLot.parkVehicle(vehicle2, EntryPoint.A);
    const rate = parkingLot.getParkingRate(ticket1.slot.slotSize);
    const hoursInMSStay = hoursToMS(48);

    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle2);
      expect(charge).toBe(rate.dailyRate * 2);
    }, hoursInMSStay);
    jest.advanceTimersByTime(hoursInMSStay);
  });
});

describe("Parking with 2 cars and reentry", () => {
  beforeAll(initParkingLot);

  const vehicle1 = new Vehicle("ZKX 571", VehicleType.L);
  const vehicle2 = new Vehicle("ZSP 382", VehicleType.L);
  let ticket1: Ticket;
  let ticket2: Ticket;

  test("Able to park a  vehicle when parking lot has slot", () => {
    ticket1 = parkingLot.parkVehicle(vehicle1, EntryPoint.A);

    expect(ticket1).toBeInstanceOf(Ticket);
    expect(ticket1.vehicle).toBe(vehicle1);
  });

  test("Should not park with same plateNumber", () => {
    expect(() => parkingLot.parkVehicle(vehicle1, EntryPoint.B)).toThrowError();
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
    expect(ticket2).toBeFalsy();
  });

  test("should receive a valid ticket when unparking", () => {
    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle1);
      expect(charge).toBeGreaterThan(0);
    }, hoursToMS(1));

    jest.advanceTimersByTime(hoursToMS(1));
  });

  test("should only pay flat rate for first 3 hours", () => {
    const rate = parkingLot.getParkingRate(ticket1.slot.slotSize);
    expect(ticket1.paidAmount).toBe(rate.flatRate);
  });

  test("can use same TICKET within 1 hr reentry", () => {
    setTimeout(() => {
      const newTicket = parkingLot.parkVehicle(vehicle1, EntryPoint.B);
      expect(newTicket).toBe(ticket1);
    }, hoursToMS(1));
    jest.advanceTimersByTime(hoursToMS(1));
  });
});

describe("Parking and reentering inside flatRate treshold", () => {
  beforeAll(initParkingLot);
  const vehicle1 = new Vehicle("ZKX 571", VehicleType.L);
  let ticket: Ticket;

  it("should give valid ticket", () => {
    ticket = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.exitTimestamp).toBeFalsy();
    expect(ticket.paidAmount).toBe(0);
  });

  it("should give flat rate for leaving after 2hrs", () => {
    const hoursStay = hoursToMS(2);
    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle1);
      const rate = parkingLot.getParkingRate(ticket.slot.slotSize);
      expect(charge).toBe(rate.flatRate);
    }, hoursStay);
    jest.advanceTimersByTime(hoursStay);
  });

  it("should give same ticket when after 30mins", () => {
    const delay = hoursToMS(0.5);
    setTimeout(() => {
      const reenterTicket = parkingLot.parkVehicle(vehicle1, EntryPoint.A);
      const rate = parkingLot.getParkingRate(ticket.slot.slotSize);
      expect(reenterTicket).toBe(ticket);
      expect(reenterTicket.paidAmount).toBe(rate.flatRate);
    }, delay);
    jest.advanceTimersByTime(delay);
  });

  it("should charge 0 for leaving before 3hrs", () => {
    const hoursStay = hoursToMS(0.25);
    setTimeout(() => {
      const charge = parkingLot.unparkVehicle(vehicle1);
      expect(charge).toBe(0);
    }, hoursStay);
    jest.advanceTimersByTime(hoursStay);
  });
});
