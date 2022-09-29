import express from "express";
import parkingLot from "../context";
import Vehicle from "../models/Vehicle";

const router = express.Router();

type Params = {
  plateNum: string;
  vehicleType: number;
  entrance: number;
};

router.post("/", (req, res) => {
  const { plateNum, vehicleType, entrance } = <Params>req.body;
  if (!plateNum || !vehicleType || !entrance) {
    res.json({ error: "Fields plateNum, vehicleType and entrance is required." });
    return;
  }

  try {
    const ticket = parkingLot.parkVehicle(new Vehicle(plateNum, vehicleType), entrance);
    res.json({ ticket });
  } catch (e) {
    res.json({ error: e });
  }
});

export default router;
