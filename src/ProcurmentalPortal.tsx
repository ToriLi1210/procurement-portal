import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Marketplace from "@/components/Marketplace";
import SubmitProduct from "@/components/SubmitProduct";
import RatingCriteria from "@/components/RatingCriteria";
import RatedDevices from "@/components/RatedDevices";
import { useSearchParams } from "react-router-dom";

// Define setShowStars as a prop in ProcurementPortal
export default function ProcurementPortal({ showStars, setShowStars }: { showStars: boolean; setShowStars: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [, setSearchParams] = useSearchParams();

  // Update searchParams when showStars state changes
  const toggleShowStars = () => {
    setShowStars((prev) => !prev);
    // Toggle the value of showStars in the query parameters
    setSearchParams({ showStars: showStars ? "false" : "true" });
  };

  // Update the ProcurementPortal layout to match the logo's aesthetic
  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center bg-gradient-to-b from-white to-blue-100">
      <div className="w-full flex items-center justify-start">
        <img src={`${import.meta.env.BASE_URL}images/Unimelb.logo.jpg`} alt="Logo" className="h-12" />
      </div>
      <h1 className="text-4xl font-bold text-blue-900">E-Waste Sustainable Procurement Portal</h1>

      <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-md"> {/* Flex container */}
      <p className="text-blue-900 font-medium">Show Ratings:</p>
      <input
        type="checkbox"
        title="Toggle star ratings visibility"
        checked={showStars}
        onChange={toggleShowStars}
        className="w-10 h-5 rounded-full bg-gray-300 appearance-none checked:bg-blue-500 relative transition-all duration-300
          before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white
          before:transition-all before:duration-300 checked:before:translate-x-5"
      />
    </div>

      <Tabs defaultValue="rated" className="space-y-4 w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <TabsList className="flex justify-center gap-4 border border-blue-200 p-2 rounded-lg">
          <TabsTrigger value="rated" className="text-blue-900">⭐ Rated Devices</TabsTrigger>
          <TabsTrigger value="market" className="text-blue-900">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit" className="text-blue-900">📤 Submit New Product</TabsTrigger>
          <TabsTrigger value="criteria" className="text-blue-900">📘 Rating Criteria</TabsTrigger>
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