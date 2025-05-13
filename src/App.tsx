import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 

function App() {
  const [showStars, setShowStars] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<ProcurementPortal showStars={showStars} setShowStars={setShowStars} />} />
        <Route path="/devices/:category/:id" element={<DeviceDetail showStars={showStars} />} />
      </Routes>
    </>
  );
}

export default App;
