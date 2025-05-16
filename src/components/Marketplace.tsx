import DeviceCard, { Device } from "@/components/DeviceCard";
import devicesData from "@/data/devices.json";

export default function Marketplace({
  cart,
  addToCart,
}: {
  cart: Device[];
  addToCart: (device: Device) => void;
}) {
  const allDevices: Device[] = Object.values(devicesData)
    .flat()
    .filter((d) => d.condition === "Second Hand");

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
        <h3 className="text-lg font-semibold mb-2">Cart</h3>
        {cart.length > 0 ? (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm text-green-700">
                  {item.condition === "Second Hand"
                    ? "Free"
                    : `$${item.price.toFixed(2)}`}
                </span>

              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allDevices.map((device, i) => (
          <DeviceCard
            key={i}
            device={device}
            showStars={false}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
