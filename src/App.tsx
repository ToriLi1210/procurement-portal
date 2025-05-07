import { Routes, Route } from 'react-router-dom';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<ProcurementPortal />} />
        <Route path="/devices/:category/:id" element={<DeviceDetail />} />
      </Routes>
    </>
  );
}

export default App;
