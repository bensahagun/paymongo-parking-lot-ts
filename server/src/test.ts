import { EntryPoint, VehicleType } from './models/enums';
import { ParkingLot } from './models/ParkingLot';
import ParkingRate from './models/ParkingRate';
import Slot from './models/Slot';
import Vehicle from './models/Vehicle';
import parkingRatesJSON from './seeds/parking-rates.json';
import slotsJSON from './seeds/slots.json';

function main(){
    const slots = slotsJSON.map(s => new Slot(s.slotNumber, s.distances , s.slotSize))
    const rates = parkingRatesJSON.map(r => new ParkingRate(r.slotSize, r.flatRate, r.hourlyRate, r.dailyRate))
    const parkingLot = new ParkingLot(slots,rates);

    try{
        const zkx = new Vehicle('ZKX 571', VehicleType.S);
        const ticket = parkingLot.parkVehicle(zkx, EntryPoint.A);
        
    }
};

main();