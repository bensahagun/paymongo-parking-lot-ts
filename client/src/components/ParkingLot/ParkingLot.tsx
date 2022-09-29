import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { getParkingMap } from "../../services/api";
import { ParkingMap } from "../../types/parkingMap";
import { SlotSize } from "../../types/enums";
import { Spinner } from "./Spinner";

const ParkingLot = () => {
  const [parkingMap, setParkingMap] = useState<ParkingMap | null>(null);

  useEffect(() => {
    getParkingMap().then((res) => setParkingMap(res.data.map));
  }, []);

  if (!parkingMap)
    return (
      <div className='flex flex-1 justify-center min-h-max'>
        <Spinner />
      </div>
    );

  return (
    <div className='gap-8 grid w-full'>
      {Object.entries(parkingMap).map(([index, slots]) => (
        <div key={index} className='border-gray-700 rounded border-solid border-2 p-8'>
          <h3 className='text-white text-3xl'>{SlotSize[index as any]}</h3>
          <div className='mx-auto pt-6 gap-6  flex items-center justify-center'>
            {slots.map((s) => (
              <div
                key={s.slotNum}
                // onClick={() => unParkVehicle(s.)}
                className='relative w-1/12 rounded mb-8 border-gray-300 dark:border-gray-700 border-dashed border-2 h-24 items-center flex justify-center  flex-col'
              >
                <span
                  className={classnames("capitalize font-bold text-xl", s.ticket ? " text-white " : "text-green-400")}
                >
                  {s.ticket ? s.ticket.vehicle.plateNum : s.slotNum}
                </span>
                <small className='text-white text-sm block'>{JSON.stringify(s.distances)}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParkingLot;
