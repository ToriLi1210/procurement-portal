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

  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-start">
        <img src={`${import.meta.env.BASE_URL}images/unimelb.logo.jpg`} alt="Logo" className="h-10" />
      </div>
      <h1 className="text-3xl font-bold">E-Waste Sustainable Procurement Portal</h1>
    
      <div className="flex items-center gap-2"> {/* Flex container */}
      <p>Show Ratings:</p>
      <input
        type="checkbox"
        title="Toggle star ratings visibility"
        checked={showStars}
        onChange={toggleShowStars}
        className="w-10 h-5 rounded-full bg-gray-300 appearance-none checked:bg-green-500 relative transition-all duration-300
          before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white
          before:transition-all before:duration-300 checked:before:translate-x-5"
      />
    </div>

      <Tabs defaultValue="rated" className="space-y-4 w-full max-w-5xl mx-auto">
        <TabsList className="flex justify-center gap-4 border border-white p-2 rounded-lg">
          <TabsTrigger value="rated">⭐ Rated Devices</TabsTrigger>
          <TabsTrigger value="market">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit">📤 Submit New Product</TabsTrigger>
          <TabsTrigger value="criteria">📘 Rating Criteria</TabsTrigger>
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