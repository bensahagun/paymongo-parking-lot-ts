import React, { useState } from "react";

enum VehicleTypes {
  "S" = 0,
  "M" = 1,
  "L" = 2,
}

const Entrance = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuText, setMenuText] = useState("");
  const [plateText, setPlateText] = useState("");

  const handleClick = () => {
    if (!menuText) {
      alert("Please select vehicle type.");
      return false;
    }

    if (!plateText) {
      alert("Please input plate number.");
      return false;
    }
  };

  console.log(Object.keys(VehicleTypes));

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
            onChange={({ target }) => setPlateText(target.value)}
            maxLength={10}
          />
        </div>
        <div className='mb-6 relative'>
          <label className='block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400'>Vehicle Type</label>
          <select
            id='vehicleType'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option selected>Select vehicle type</option>

            {Object.keys(VehicleTypes).map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
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
