import { VehicleType } from "../enums";
import Vehicle from "../Vehicle";

describe("Vehichle", () => {
  it("it should be initialized", () => {
    const vehicle = new Vehicle("ABC 123", 0);
    expect(vehicle).toBeInstanceOf(Vehicle);
    expect(vehicle.plateNum).toBe("ABC 123");
    expect(vehicle.vehicleType).toBe(VehicleType.S);
  });
});
