import ParkingRate from "../ParkingRate";

describe("Parking Rate", () => {
  it("should be initialized with default params", () => {
    const parkingRate = new ParkingRate(0, 20);
    expect(parkingRate).toBeInstanceOf(ParkingRate);
    expect(parkingRate.dailyRate).toBe(5000);
    expect(parkingRate.flatRate).toBe(40);
    expect(parkingRate.flatRateHours).toBe(3);
  });

  it("should be initialized with custom rates", () => {
    const parkingRate = new ParkingRate(1, 20, 6000, 60, 3);
    expect(parkingRate).toBeInstanceOf(ParkingRate);
    expect(parkingRate.flatRate).toBe(60);
    expect(parkingRate.flatRateHours).toBe(3);
    expect(parkingRate.dailyRate).toBe(6000);
  });
});
