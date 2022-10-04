import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { parkVehicle } from "../../services/api";

const Entrance = () => {
  const [vehicleType, setVehicleType] = useState(-1);
  const [entrance, setEntrance] = useState(-1);
  const [plateNum, setPlateNum] = useState("");
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  const handleClick = () => {
    if (!plateNum || vehicleType < 0 || entrance < 0) {
      alert("All fields are required.");
      return false;
    }

    parkVehicle(plateNum, vehicleType, entrance).then((msg) => alert(msg));
  };

  const generateRandomPlateNum = () => {
    setPlateNum(faker.vehicle.vrm());
  };

  return (
    <>
      <div className=' border-slate-500 border-solid  border-2 p-8'>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-300 text-2xl '>Plate Number</label>
          <div className='flex gap-2 '>
            <input
              type='text'
              id='plate-number'
              className='text-lg text-center rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 uppercase'
              placeholder='ABC 123'
              value={plateNum}
              onChange={({ target }) => setPlateNum(target.value.toUpperCase())}
              maxLength={10}
            />
            <button
              type='button'
              className=' text-white font-medium rounded  text-xl px-4 py-3 text-center border-1 border border-gray-600 '
              onClick={() => generateRandomPlateNum()}
            >
              🚗
            </button>
          </div>
        </div>
        <div className='mb-6 relative'>
          <label className='block mb-2 text-xl font-medium text-gray-400'>Vehicle Type</label>
          <select
            id='vehicleType'
            className='border border-gray-300 text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
            onChange={({ target }) => setVehicleType(target.value as any)}
            defaultValue={-1}
          >
            <option value={-1}>Select vehicle type</option>
            <option value={0}>Small</option>
            <option value={1}>Medium</option>
            <option value={2}>Large</option>
          </select>
        </div>
        <div className='mb-6 relative'>
          <label className='block mb-2 text-xl font-medium  text-gray-400'>Entrance</label>
          <select
            id='entrance'
            className='border border-gray-300 text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
            onChange={({ target }) => setEntrance(target.value as any)}
            defaultValue={-1}
          >
            <option value={-1}>Select entrance</option>
            <option value={0}>A</option>
            <option value={1}>B</option>
            <option value={2}>C</option>
          </select>
        </div>
        <div>
          <button
            type='button'
            className='text-white focus:ring-4 rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'
            style={{ width: "200px" }}
            onClick={handleClick}
          >
            Park!
          </button>
        </div>
        <div className='text-white mt-2'>{clock.toLocaleString()}</div>
      </div>
    </>
  );
};

export default Entrance;
