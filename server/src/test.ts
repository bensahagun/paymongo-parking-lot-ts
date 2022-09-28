import { EntryPoint, VehicleType } from "./models/enums";
import { ParkingLot } from "./models/ParkingLot";
import ParkingRate from "./models/ParkingRate";
import Slot from "./models/Slot";
import Vehicle from "./models/Vehicle";
import parkingRatesJSON from "./seeds/parking-rates.json";
import slotsJSON from "./seeds/slots.json";

function main() {
  const slots = slotsJSON.map((s) => new Slot(s.slotNumber, s.distances, s.slotSize));
  const rates = parkingRatesJSON.map((r) => new ParkingRate(r.slotSize, r.hourlyRate, r.dailyRate, r.flatRate));
  const parkingLot = new ParkingLot(slots, rates);

  try {
    const zkx = new Vehicle("ZKX 571", VehicleType.M);
    const ticket = parkingLot.parkVehicle(zkx, EntryPoint.A);

    const avi = new Vehicle("ZSP 382", VehicleType.M);
    const ticket1 = parkingLot.parkVehicle(avi, EntryPoint.B);

    const hey = new Vehicle("HEY 123", VehicleType.S);
    const ticket2 = parkingLot.parkVehicle(hey, EntryPoint.B);

    const big1 = new Vehicle("BIG 23", VehicleType.M);
    const ticket3 = parkingLot.parkVehicle(big1, EntryPoint.B);

    console.log(ticket, ticket1, ticket2, ticket3);
  } catch (e) {
    console.log(e);
  }
}

main();
