import React, { useState } from "react";
import Entrance from "./components/Entrance/Entrance";
import ParkingLot from "./components/ParkingLot/ParkingLot";
import Tabs from "./components/Tabs/Tabs";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className='w-2/12 '>
            <Entrance />
          </div>
        );
      case 1:
        return (
          <div className='w-8/12 '>
            <ParkingLot />
          </div>
        );
    }
  };

  return (
    <div className='p-12 bg-slate-800 min-h-screen text-center flex flex-col items-center '>
      <div className='mb-5'>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
