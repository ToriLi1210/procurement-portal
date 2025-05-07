import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProcurementPortal from './ProcurmentalPortal';
import DeviceDetail from './components/DeviceDetail'; 
import { Toaster } from "sonner";
import posthog from 'posthog-js';

posthog.init('phc_duX4x5EIr1r5lCkRjkdGnZKsJclc3BymvnhEiKIsCKl', {
  api_host: 'https://app.posthog.com', 
});

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
