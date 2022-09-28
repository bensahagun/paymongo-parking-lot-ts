import { VehicleType } from "./enums";

export default class Vehicle {
  plateNum: string;
  vehicleType: VehicleType;

  constructor(plateNum: string, vehicleType: VehicleType) {
    this.plateNum = plateNum;
    this.vehicleType = vehicleType;
  }
}
