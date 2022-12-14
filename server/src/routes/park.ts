import express from "express";
import parkingLot from "../parkingLot";
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
    res.json({ slotNum: ticket.slot.slotNum });
  } catch (e) {
    res.json({ error: (e as Error).message });
  }
});

export default router;
