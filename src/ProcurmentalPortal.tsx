import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Marketplace from "@/components/Marketplace";
import SubmitProduct from "@/components/SubmitProduct";
import RatingCriteria from "@/components/RatingCriteria";
import RatedDevices from "@/components/RatedDevices";
// import { useSearchParams } from "react-router-dom";

// Define setShowStars as a prop in ProcurementPortal
export default function ProcurementPortal({
  showStars,
  onLogout,
}: {
  showStars: boolean;
  onLogout: () => void;
}) {


  // // Update searchParams when showStars state changes
  // const toggleShowStars = () => {
  //   setShowStars((prev) => !prev);
  //   // Toggle the value of showStars in the query parameters
  //   setSearchParams({ showStars: showStars ? "false" : "true" });
  // };

  // Update the ProcurementPortal layout to match the logo's aesthetic
  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center bg-gradient-to-b from-white to-blue-100">
      {/* Logout Button on left */}
      <div className="w-full flex justify-start">
        <button
          onClick={onLogout}
          className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-bold text-blue-900">E-Waste Sustainable Procurement Portal</h1>

   
      <Tabs defaultValue="rated" className="space-y-4 w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <TabsList className="flex justify-center gap-4 border border-blue-200 p-2 rounded-lg">
          <TabsTrigger value="rated" className="text-blue-900">⭐ Rated Devices</TabsTrigger>
          <TabsTrigger value="market" className="text-blue-900">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit" className="text-blue-900">📤 Submit New Product</TabsTrigger>
          {showStars && (
            <TabsTrigger value="criteria" className="text-blue-900">
              📘 Rating Criteria
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="rated">
          {/* Pass the showStars state to RatedDevices */}
          <RatedDevices showStars={showStars} />
        </TabsContent>
        <TabsContent value="market">
          <Marketplace />
        </TabsContent>
        <TabsContent value="submit">
          <SubmitProduct />
        </TabsContent>
        <TabsContent value="criteria">
          <RatingCriteria />
        </TabsContent>
      </Tabs>
    </div>
  );
}