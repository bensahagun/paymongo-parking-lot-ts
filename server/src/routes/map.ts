import express from "express";
import { groupBy } from "lodash";

import parkingLot from "../context";
import { ParkingLotUtils } from "../models/ParkingLot";

const router = express.Router();

router.get("/", (_, res) => {
  const slotsWithTicket = parkingLot.slots.map((slot) => {
    const ticket = parkingLot.tickets.find((ticket) => ticket.slot.slotNum == slot.slotNum);
    console.log(ticket?.slot);

    if (ticket && ParkingLotUtils.validateTicket(ticket, parkingLot.ticketHoursValid)) {
      return { ...slot, ticket };
    }
    return slot;
  });

  const map = groupBy(slotsWithTicket, "slotSize");
  res.json({ map });
});

export default router;
