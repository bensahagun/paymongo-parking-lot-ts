import { EntryPoint, VehicleType } from "./models/enums";
import { ParkingLot } from "./models/ParkingLot";
import ParkingRate from "./models/ParkingRate";
import Slot from "./models/Slot";
import Vehicle from "./models/Vehicle";
import parkingRatesJSON from "./seeds/parking-rates.json";
import slotsJSON from "./seeds/slots.json";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const slots = slotsJSON.map((s) => new Slot(s.slotNum, s.distances, s.slotSize));
  const rates = parkingRatesJSON.map((r) => new ParkingRate(r.slotSize, r.hourlyRate, r.dailyRate, r.flatRate));
  const parkingLot = new ParkingLot(slots, rates);

  try {
    const zkx = new Vehicle("ZKX 571", VehicleType.L);
    let ticket = parkingLot.parkVehicle(zkx, EntryPoint.A);

    await delay(2000);
    console.log(parkingLot.unparkVehicle("ZKX 571"), ticket);
    await delay(800);
    console.log(parkingLot.parkVehicle(zkx, EntryPoint.A));
    await delay(1200);
    console.log(parkingLot.unparkVehicle("ZKX 571"), ticket);
    await delay(1500);

    const avi = new Vehicle("ZSP 382", VehicleType.M);
    let aviticket = parkingLot.parkVehicle(avi, EntryPoint.B);
    ticket = parkingLot.parkVehicle(zkx, EntryPoint.B);
    console.log(ticket, aviticket);
    await delay(1000);

    ticket = parkingLot.parkVehicle(zkx, EntryPoint.B);
    console.log(ticket);
    await delay(5000);
    console.log(parkingLot.unparkVehicle("ZKX 571"), ticket);
    await delay(700);
    ticket = parkingLot.parkVehicle(zkx, EntryPoint.B);
    console.log(ticket);
    await delay(23100);
    console.log(parkingLot.unparkVehicle("ZKX 571"), ticket);

    // await delay(3500);

    // const newTicket = parkingLot.parkVehicle(zkx, EntryPoint.A);
    // console.log(newTicket);

    // await delay(1000);

    // const unpark = parkingLot.unparkVehicle("ZKX 571");
    // console.log(unpark);

    // const hey = new Vehicle("HEY 123", VehicleType.S);
    // const ticket2 = parkingLot.parkVehicle(hey, EntryPoint.B);

    // const big1 = new Vehicle("BIG 23", VehicleType.L);
    // const ticket3 = parkingLot.parkVehicle(big1, EntryPoint.B);

    // const big2 = new Vehicle("BIGGER3", VehicleType.L);
    // const ticket4 = parkingLot.parkVehicle(big2, EntryPoint.A);
  } catch (e) {
    console.log(e);
  }
}

main();
