import { SlotSize, VehicleType } from "../enums";
import Slot from "../Slot";
import Ticket from "../Ticket";
import Vehicle from "../Vehicle";

describe("Ticket", () => {
  it("should initialize a valid ticket", () => {
    const vehicle = new Vehicle("ZZZ 111", VehicleType.M);
    const slot = new Slot(1, [1, 2], SlotSize.MP);
    const ticket = new Ticket(vehicle, slot);
    expect(ticket).toBeInstanceOf(Ticket);
    expect(ticket.vehicle).toBe(vehicle);
    expect(ticket.slot).toBe(slot);
    expect(ticket.entryTimestamp).toBeLessThanOrEqual(Date.now());
    expect(ticket.exitTimestamp).toBeFalsy();
  });
});
