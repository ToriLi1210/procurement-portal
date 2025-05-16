// ✅ ProcurementPortal.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SubmitProduct from "@/components/SubmitProduct";
import RatingCriteria from "@/components/RatingCriteria";
import { Device } from "./components/DeviceCard";
import { useState, useEffect } from "react";
import DeviceCategoryTabs from "@/components/RatedDevices";
import { useSearchParams } from "react-router-dom";

export default function ProcurementPortal({
  showStars,
  onLogout,
}: {
  showStars: boolean;
  onLogout: () => void;
}) {

  const [searchParams] = useSearchParams();

  const defaultMainTab = searchParams.get("marketTab")
    ? "market"
    : searchParams.get("ratedTab")
    ? "rated"
    : "rated";

  const [cart, setCart] = useState<Device[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (device: Device) => {
    setCart((prev) => {
      const newCart = [...prev, device];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="min-h-screen p-6 space-y-6 flex flex-col items-center bg-gradient-to-b from-white to-blue-100">
      <div className="w-full flex justify-start">
        <button
          onClick={onLogout}
          className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-blue-900">
        E-Waste Sustainable Procurement Portal
      </h1>

      <Tabs
        defaultValue={defaultMainTab} // ✅ use URL to control active tab
        className="space-y-4 w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <TabsList className="flex justify-center gap-4 border border-blue-200 p-2 rounded-lg">
          <TabsTrigger value="rated" className="text-blue-900">⭐ Devices</TabsTrigger>
          <TabsTrigger value="market" className="text-blue-900">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit" className="text-blue-900">📤 Submit New Product</TabsTrigger>
          {showStars && (
            <TabsTrigger value="criteria" className="text-blue-900">
              📘 Rating Criteria
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="rated">
          <DeviceCategoryTabs
            title="Electronics by Category"
            showStars={showStars}
            cart={cart}
            addToCart={addToCart}
            urlKey="ratedTab"
            conditionFilter="Brand New"
          />
        </TabsContent>

        <TabsContent value="market">
          <DeviceCategoryTabs
            title="Electronics by Category"
            showStars={showStars}
            cart={cart}
            addToCart={addToCart}
            urlKey="marketTab"
            conditionFilter="Second Hand"
          />
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
