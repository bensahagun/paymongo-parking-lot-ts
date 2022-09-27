import React, { useState } from "react";

const types = ["Small", "Medium", "Large"];

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

  return (
    <>
      <div className=' border-slate-500 border-solid  border-2 p-8'>
        <div className='mb-6'>
          <label className='block mb-2font-medium text-gray-900 dark:text-gray-300 text-2xl mb-2'>Plate Number</label>
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
          <div className='relative inline-block text-left'>
            <div>
              <button
                type='button'
                className='justify-center rounded-md border border-gray-300 bg-slate-800 px-8 py-4 font-medium text-1xl text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ minWidth: "200px" }}
              >
                <span className='inline-flex text-xl'>
                  {menuText || "Vehicle Type"}
                  <svg
                    className='-mr-2 ml-2 h-7 w-7'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </button>
            </div>
            {menuOpen ? (
              <div
                className='absolute center left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
              >
                <div className='py-1' role='none'>
                  {types.map((type) => (
                    <a
                      key={type}
                      href='#'
                      className='text-white block px-4 py-2 text-md'
                      role='menuitem'
                      id={`menu-item-${type}`}
                      onClick={() => {
                        setMenuText(type);
                        setMenuOpen(false);
                      }}
                    >
                      {type}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
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
