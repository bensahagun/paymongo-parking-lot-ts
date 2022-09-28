import express from "express";

const app = express();

app.get("/:action/:plateNum/:size/:entry", (req, res) => {
  const { action, plateNum, size, entry } = req.params;
  try {
    if (action == "0") {
      res.json(parkingLot.park(plateNum, size as any as Size, entry as any as EntryPoint));
    }

    if (action == "1") {
      res.json(parkingLot.unpark(plateNum));
    }

    if (action == "2") {
      res.json(parkingLot.getMap());
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080, () => {
  console.log("Server starts http://localhost:8080");
});

type Size = 0 | 1 | 2;
type EntryPoint = 0 | 1 | 2;

const returnThreshold = 1;
const flatThreshold = 3;
const dayThreshold = 24;
const flatRate = 40;
const dayRate = 5000;
const rates = {
  0: 20,
  1: 60,
  2: 100,
};

function getHoursDiff(startDate: number, endDate: number) {
  const msInHour = 1000 * 60 * 60;
  return Math.ceil(Math.abs(endDate - startDate) / msInHour);
}

class Ticket {
  plateNumber: string;
  slot: Slot;
  paidAmount: number;
  entryTimestamp: number;
  exitTimestamp?: number;

  constructor(plateNumber: string, slot: Slot) {
    this.plateNumber = plateNumber;
    this.slot = slot;
    this.paidAmount = 0;
    this.entryTimestamp = Date.now();
  }

  isActive() {
    if (!this.exitTimestamp) return true;
    if (getHoursDiff(this.entryTimestamp, this.exitTimestamp) <= returnThreshold) return true;
    return false;
  }

  calculateAmount(timestamp: number) {
    const totalHours = getHoursDiff(this.entryTimestamp, timestamp);

    if (totalHours <= flatThreshold) return flatRate;
    if (totalHours <= dayThreshold) return (totalHours - flatThreshold) * rates[this.slot.size] + flatRate;

    return dayRate * Math.floor(totalHours / dayThreshold) + rates[this.slot.size] * (totalHours % dayThreshold);
  }

  exit() {
    const timestamp = Date.now();
    const toPay = this.calculateAmount(timestamp) - this.paidAmount;

    this.paidAmount += toPay;
    this.exitTimestamp = timestamp;

    return toPay;
  }

  reEnter() {
    if (!this.isActive()) return false;
    this.exitTimestamp = undefined;
    return true;
  }
}

class Slot {
  slotNumber: number;
  size: Size;
  distances: number[];

  constructor(slotNumber: number, size: Size, entryPoints: number[]) {
    this.slotNumber = slotNumber;
    this.size = size;
    this.distances = entryPoints.map((entryPoint) => Math.abs(entryPoint - slotNumber));
  }
}

class ParkingLot {
  slots: Slot[];
  tickets: Ticket[];

  constructor(input: { slotNumber: number; size?: Size }[]) {
    const entryPoints = input.filter(({ size }) => size == undefined).map(({ slotNumber }) => slotNumber);

    this.slots = input
      .filter(({ size }) => size != undefined)
      .map(({ slotNumber, size }) => new Slot(slotNumber, size!, entryPoints));
    this.tickets = [];
  }

  getTicket(plateNumber: string) {
    return this.tickets.find((ticket: Ticket) => ticket.plateNumber === plateNumber);
  }

  getActiveTickets() {
    return this.tickets.filter((ticket) => ticket.isActive());
  }

  getParkingSlot(size: Size, entryPoint: EntryPoint) {
    const occupiedSlots = this.getActiveTickets().map((ticket) => ticket.slot);

    const validSlots = this.slots.filter((slot: Slot) => slot.size >= size && !occupiedSlots.includes(slot));
    return validSlots.sort((a: Slot, b: Slot) => a.distances[entryPoint] - b.distances[entryPoint])[0];
  }

  getMap() {
    return this.slots.map((slot) => {
      const ticket = this.tickets.find((ticket) => ticket.slot == slot);

      if (ticket?.isActive()) {
        return { ...slot, occupantTicket: ticket };
      }
      return slot;
    });
  }

  park(plateNumber: string, size: Size, entryPoint: EntryPoint) {
    const ticket = this.getTicket(plateNumber);
    if (ticket?.reEnter()) {
      return ticket;
    }

    const slot = this.getParkingSlot(size, entryPoint);
    if (!slot) throw Error("no slot");

    const newTicket = new Ticket(plateNumber, slot);
    this.tickets = [newTicket, ...this.tickets];
    return newTicket;
  }

  unpark(plateNumber: string) {
    const ticket = this.getTicket(plateNumber);
    if (!ticket) throw Error("No ticket");

    return ticket.exit();
  }
}

const parkingLot = new ParkingLot([
  { slotNumber: 0, size: 0 },
  { slotNumber: 1, size: 0 },
  { slotNumber: 2, size: 0 },
  { slotNumber: 3, size: 0 },
  { slotNumber: 4 },
]);

// parkingLot.park("zxc", 0, 0);
// parkingLot.unpark("zxc");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const cli = () =>
//   rl.question("Input (0 - park, 1 - unpark, 2 - print map): ", function (input: string) {
//     try {
//       const inputArray = input.split(" ");

//       if (inputArray[0] == "0") {
//         console.log(
//           parkingLot.park(inputArray[1], parseInt(inputArray[2]) as Size, parseInt(inputArray[3]) as EntryPoint)
//         );
//       }

//       if (inputArray[0] == "1") {
//         console.log(parkingLot.unpark(inputArray[1]));
//       }

//       if (inputArray[0] == "2") {
//         console.log(parkingLot.getMap());
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     cli();
//   });

// cli();
