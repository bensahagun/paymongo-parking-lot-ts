import { ParkingLot } from "./models/ParkingLot";
import ParkingRate from "./models/ParkingRate";
import Slot from "./models/Slot";
import parkingRatesJSON from "./seeds/parking-rates.json";
import slotsJSON from "./seeds/slots.json";

const slots = slotsJSON
  .sort((a, b) => a.slotSize - b.slotSize)
  .map((s) => new Slot(s.slotNum, s.distances, s.slotSize));
const rates = parkingRatesJSON.map((r) => new ParkingRate(r.slotSize, r.hourlyRate, r.dailyRate, r.flatRate));
const parkingLot = new ParkingLot(slots, rates);

export default parkingLot;
