import axios from "axios";
import React, { ChangeEvent, useState } from "react";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

const Entrance = () => {
  const [vehicleType, setVehicleType] = useState(-1);
  const [entrance, setEntrance] = useState(-1);
  const [plateText, setPlateText] = useState("");

  const handleClick = () => {
    if (!plateText || vehicleType < 0 || entrance < 0) {
      alert("All fields are required.");
      return false;
    }

    axios
      .post(baseURL + "/park", {
        plateNum: plateText,
        vehicleType: vehicleType,
        entrance: entrance,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <div className=' border-slate-500 border-solid  border-2 p-8'>
        <div className='mb-6'>
          <label className='block mb-2 font-medium text-gray-900 dark:text-gray-300 text-2xl '>Plate Number</label>
          <input
            type='text'
            id='plate-number'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-lg text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase'
            placeholder='ABC 123'
            value={plateText}
            onChange={({ target }) => setPlateText(target.value.toUpperCase())}
            maxLength={10}
          />
        </div>
        <div className='mb-6 relative'>
          <label className='block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400'>Vehicle Type</label>
          <select
            id='vehicleType'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
          <label className='block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400'>Entrance</label>
          <select
            id='entrance'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            style={{ width: "200px" }}
            onClick={handleClick}
          >
            Park!
          </button>
        </div>
      </div>
    </>
  );
};

export default Entrance;
