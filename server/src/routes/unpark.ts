import express from "express";
import parkingLot from "../parkingLot";
import Vehicle from "../models/Vehicle";

const router = express.Router();

type Params = {
  vehicle: Vehicle;
  customTimestamp: number;
};

router.post("/", (req, res) => {
  const { vehicle, customTimestamp } = <Params>req.body;

  if (!vehicle) {
    res.json({ error: "Fields vehicle is required." });
    return;
  }

  try {
    const charge = parkingLot.unparkVehicle(new Vehicle(vehicle.plateNum, vehicle.vehicleType), customTimestamp);
    res.json({ charge });
  } catch (e) {
    res.json({ error: (e as Error).message });
  }
});

export default router;
