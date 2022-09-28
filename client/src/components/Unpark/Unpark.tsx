import React from "react";
import classnames from "classnames";

const data = [
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
    occupant: null,
  },
  {
    slotNumber: 4,
    vehicleType: "SP",
    occupant: "HI 1234",
  },
  {
    slotNumber: 5,
    vehicleType: "MP",
    occupant: null,
  },

  {
    slotNumber: 6,
    vehicleType: "LP",
    occupant: null,
  },

  {
    slotNumber: 7,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 8,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 9,
    vehicleType: "MP",
    occupant: null,
  },

  {
    slotNumber: 10,
    vehicleType: "LP",
    occupant: null,
  },

  {
    slotNumber: 11,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 12,
    vehicleType: "SP",
    occupant: "BRO 312",
  },
  {
    slotNumber: 13,
    vehicleType: "MP",
    occupant: null,
  },

  {
    slotNumber: 14,
    vehicleType: "LP",
    occupant: null,
  },

  {
    slotNumber: 15,
    vehicleType: "SP",
    occupant: null,
  },

  {
    slotNumber: 16,
    vehicleType: "SP",
    occupant: null,
  },

  {
    slotNumber: 17,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 18,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 19,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 20,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 21,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 22,
    vehicleType: "SP",
    occupant: null,
  },
  {
    slotNumber: 23,
    vehicleType: "SP",
    occupant: null,
  },
];

const ParkingLot = () => {
  return (
    <div>
      <div id='parking-lot' className=' container mx-auto grid grid-cols-8 pt-6 gap-8'>
        {data.map((s) => {
          return (
            <div
              key={s.slotNumber}
              className='relative rounded mb-8  border-gray-300 dark:border-gray-700 border-dashed border-2 h-24 items-center flex justify-center'
            >
              <span
                className={classnames("capitalizefont-bold text-xl", s.occupant ? " text-white " : "text-green-400")}
              >
                {s.occupant || s.slotNumber + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkingLot;
