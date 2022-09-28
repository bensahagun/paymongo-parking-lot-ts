import React from "react";
import classnames from "classnames";

const data = [
  {
    slotSize: "SP",
    slots: [
      {
        slotNumber: 0,
        vehicleType: "SP",
        occupant: "ZKX 213",
      },
      {
        slotNumber: 1,
        vehicleType: "MP",
        occupant: "HEY 321",
      },
      {
        slotNumber: 2,
        vehicleType: "LP",
        occupant: "HEHE 231",
      },
      {
        slotNumber: 3,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 4,
        vehicleType: "SP",
        occupant: "HI 1234",
      },
      {
        slotNumber: 5,
        vehicleType: "MP",
        occupant: undefined,
      },
      {
        slotNumber: 6,
        vehicleType: "LP",
        occupant: undefined,
      },
      {
        slotNumber: 7,
        vehicleType: "SP",
        occupant: undefined,
      },
    ],
  },
  {
    slotSize: "MP",
    slots: [
      {
        slotNumber: 8,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 9,
        vehicleType: "MP",
        occupant: undefined,
      },

      {
        slotNumber: 10,
        vehicleType: "LP",
        occupant: undefined,
      },

      {
        slotNumber: 11,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 12,
        vehicleType: "SP",
        occupant: "BRO 312",
      },
      {
        slotNumber: 13,
        vehicleType: "MP",
        occupant: undefined,
      },

      {
        slotNumber: 14,
        vehicleType: "LP",
        occupant: undefined,
      },

      {
        slotNumber: 15,
        vehicleType: "SP",
        occupant: undefined,
      },
    ],
  },
  {
    slotSize: "LP",
    slots: [
      {
        slotNumber: 16,
        vehicleType: "SP",
        occupant: undefined,
      },

      {
        slotNumber: 17,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 18,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 19,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 20,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 21,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 22,
        vehicleType: "SP",
        occupant: undefined,
      },
      {
        slotNumber: 23,
        vehicleType: "SP",
        occupant: undefined,
      },
    ],
  },
];

const ParkingLot = () => {
  const unParkVehicle = (plateNum: string | undefined) => {};

  return (
    <div className='gap-8 grid'>
      {data.map((slot, key) => (
        <div key={key} className='border-gray-700 rounded border-solid border-2 p-8'>
          <h3 className='text-white text-3xl'>{slot.slotSize}</h3>
          <div className='mx-auto pt-6 gap-6  flex items-center justify-center'>
            {slot.slots.map((s) => (
              <div
                key={s.slotNumber}
                onClick={() => unParkVehicle(s.occupant)}
                className={classnames(
                  "cursor-pointer hover:bg-slate-700 relative w-1/12 rounded mb-8 border-gray-300 dark:border-gray-700 border-2 h-24 items-center flex justify-center",
                  s.occupant ? "border-solid" : "border-dashed"
                )}
              >
                <span
                  className={classnames("capitalize font-bold text-xl", s.occupant ? " text-white " : "text-green-400")}
                >
                  {s.occupant || s.slotNumber}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingLot;
