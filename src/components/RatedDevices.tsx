import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RatedCategoryPanel from "@/components/RatedCategoryPanel";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { Device } from "@/components/DeviceCard";
import rawDataJson from "@/data/devices.json";

type DeviceDataMap = Record<string, Device[]>;

const categoryLabelMap: Record<string, string> = {
  Laptops: "Laptop",
  Monitor: "Monitor",
  Keyboard: "Keyboard",
  Microwave: "Microwave",
  Scientificequipment: "Scientific Equipment",
};

const rawData: DeviceDataMap = rawDataJson;

const mapDeviceCategories = (devices: Device[], conditionFilter?: string) => {
  const mapped: Record<string, Device[]> = {};
  for (const key in rawData) {
    const label = categoryLabelMap[key] || key;
    mapped[label] = rawData[key].filter(d =>
      !conditionFilter || d.condition === conditionFilter
    );
  }
  return mapped;
};

export default function DeviceCategoryTabs({
  showStars,
  cart,
  addToCart,
  title,
  urlKey = "tab", // eg: "ratedTab", "marketTab"
  conditionFilter,
}: {
  showStars: boolean;
  cart: Device[];
  addToCart: (device: Device) => void;
  title: string;
  urlKey?: string;
  conditionFilter?: "Brand New" | "Second Hand";
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const deviceCategories = mapDeviceCategories(Object.values(rawData).flat(), conditionFilter);
  const defaultTab = Object.keys(deviceCategories)[0];
  const currentTab = searchParams.get(urlKey) || defaultTab;

  // ✅ 只保留当前 urlKey，不保留其他 query
  useEffect(() => {
    if (!searchParams.get(urlKey)) {
      const next = new URLSearchParams();
      next.set(urlKey, defaultTab);
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams, urlKey, defaultTab]);

  if (!currentTab) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>

      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          const next = new URLSearchParams();
          next.set(urlKey, value);
          setSearchParams(next);
        }}
        className="space-y-2"
      >
        <TabsList className="overflow-x-auto flex gap-2">
          {Object.keys(deviceCategories).map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(deviceCategories).map(([cat, devices]) => (
          <TabsContent key={cat} value={cat}>
            <RatedCategoryPanel
              categoryName={cat}
              devices={devices}
              showStars={showStars}
              cart={cart}
              addToCart={addToCart}
              conditionFilter={conditionFilter}
              fromMainTab={urlKey === "marketTab" ? "market" : "rated"}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
