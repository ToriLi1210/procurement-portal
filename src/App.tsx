import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 
import LoginGate from './components/LoginGate';

function App() {
  const [showStars, setShowStars] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginGate onAccess={(showRating) => {
      // a - showingRating => False
      // b - showingRating => True
      setShowStars(showRating);
      setAuthenticated(true);
    }} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<ProcurementPortal showStars={showStars} onLogout={() => setAuthenticated(false)}/>} />
        <Route path="/devices/:category/:id" element={<DeviceDetail showStars={showStars} />} />
      </Routes>
    </>
  );
}

export default App;
