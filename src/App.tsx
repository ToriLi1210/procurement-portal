import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 
import { Toaster } from "sonner";

function App() {
  return (
  
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<ProcurementPortal />} />
        
        {/* Detail Page */}
        <Route path="/devices/:category/:id" element={<DeviceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
