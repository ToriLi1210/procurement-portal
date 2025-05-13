import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RatedCategoryPanel from "@/components/RatedCategoryPanel";
import { useState } from "react";
import { toast } from "react-toastify";

type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
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
  // Lift the cart state to RatedDevices
  const [cart, setCart] = useState<Device[]>([]);

  // Function to add items to the cart
  const addToCart = (device: Device) => {
    setCart((prevCart) => [...prevCart, device]);
    toast.success(`${device.name} added to cart`, {
      toastId: "cart-toast",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Rated Electronics by Category
      </h2>

      <Tabs defaultValue="Laptop" className="space-y-2">
        <TabsList className="overflow-x-auto flex gap-2">
          {Object.keys(deviceCategories).map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(deviceCategories).map(([cat, devices]) => (
          <TabsContent key={cat} value={cat}>
            <div className="relative">
              {/* Hanging Cart */}
              <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
                <h3 className="text-lg font-semibold mb-2">Cart</h3>
                {cart.length > 0 ? (
                  <ul className="space-y-2">
                    {cart.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <span className="text-sm text-green-700">
                          ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                )}
              </div>

              {/* Pass cart and addToCart to RatedCategoryPanel */}
              <RatedCategoryPanel
                categoryName={cat}
                devices={devices}
                showStars={showStars}
                cart={cart}
                addToCart={addToCart}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
