import cx from "classnames";
import { useEffect, useState } from "react";
import { getParkingMap, unparkVehicle } from "../../services/api";
import { SlotSize } from "../../types/enums";
import { ParkingMap } from "../../types/parkingMap";
import { Ticket } from "../../types/ticket";
import { Spinner } from "./Spinner";

const ParkingLot = () => {
  const [parkingMap, setParkingMap] = useState<ParkingMap | null>(null);

  const fetchParkingMap = () => {
    return getParkingMap().then((data) => setParkingMap(data.map));
  };

  useEffect(() => {
    fetchParkingMap();
  }, []);

  const unParkVehicle = (ticket: Ticket) => {
    if (!ticket || ticket.exitTimestamp) return;

    unparkVehicle(ticket).then((charge) => {
      alert("Charge: " + charge);
      fetchParkingMap();
    });
  };

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
                onClick={() => unParkVehicle(s.ticket)}
                className={cx(
                  "relative w-1/12 rounded mb-8  border-gray-700 border-dashed border-2 h-24 items-center flex justify-center flex-col",
                  s.ticket ? "cursor-pointer hover:bg-gray-600" : "",
                  s.ticket?.exitTimestamp ? "cursor-default border-red-700" : ""
                )}
              >
                <span className={cx("capitalize font-bold text-xl", s.ticket ? " text-white " : "text-green-400")}>
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
