import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RatedCategoryPanel from "@/components/RatedCategoryPanel";

type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star:number;
  price: number;
};

type DeviceDataMap = Record<string, Device[]>;

import rawDataJson from "@/data/devices.json";
const rawData: DeviceDataMap = rawDataJson;

const categoryLabelMap: Record<string, string> = {
  Laptops: "Laptop",
  Monitor: "Monitor",
  Keyboard: "Keyboard",
  Microwave: "Microwave",
  Scientificequipment: "Scientific Equipment",
};

const deviceCategories: Record<string, Device[]> = {};

for (const key in rawData) {
  const label = categoryLabelMap[key] || key;
  deviceCategories[label] = rawData[key];
}


export default function RatedDevices({ showStars }: { showStars: boolean }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Rated Electronics by Category</h2>

      <Tabs defaultValue="Laptop" className="space-y-2">
        <TabsList className="overflow-x-auto flex gap-2">
          {Object.keys(deviceCategories).map((cat) => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(deviceCategories).map(([cat, devices]) => (
          <TabsContent key={cat} value={cat}>
            <RatedCategoryPanel categoryName={cat} devices={devices} showStars={showStars} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
