import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Marketplace from "@/components/Marketplace";
import SubmitProduct from "@/components/SubmitProduct";
import RatingCriteria from "@/components/RatingCriteria";
import RatedDevices from "@/components/RatedDevices";

export default function ProcurementPortal() {
  return (
    <div className="p-6 space-y-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold">E-Waste Sustainable Procurement Portal</h1>

      <Tabs defaultValue="rated" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rated">⭐ Rated Devices</TabsTrigger>
          <TabsTrigger value="market">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit">📤 Submit New Product</TabsTrigger>
          <TabsTrigger value="criteria">📘 Rating Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="rated">
          <RatedDevices />
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
