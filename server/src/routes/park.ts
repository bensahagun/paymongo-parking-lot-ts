import express from "express";
import parkingLot from "../context";

const router = express.Router();

type Params = {
  plateNum: string;
  vehicleType: number;
};

router.post("/", (req, res) => {
  const { plateNum, vehicleType } = <Params>req.params;
  if (!plateNum || !vehicleType) {
    res.json({ error: "Fields plateNum, vehicleType is required." });
    return;
  }

  res.json(parkingLot.slots);
});

export default router;
