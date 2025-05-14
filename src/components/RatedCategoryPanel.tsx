import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import posthog from "posthog-js";

type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
  price: number;
  condition: string;

};

// Add cart and addToCart as props to RatedCategoryPanel
export default function RatedCategoryPanel({
  categoryName,
  devices,
  showStars,
  cart,
  addToCart,
}: {
  categoryName: string;
  devices: Device[];
  showStars: boolean;
  cart: Device[];
  addToCart: (device: Device) => void;
}) {
  const navigate = useNavigate();

  // State for search text input
  const [search, setSearch] = useState("");

  // State for minimum star rating filter and maximum price
  const [minStars, setMinStars] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  // Filter devices by search term, minimum star rating, and maximum price
  const filtered = devices.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      d.star >= minStars &&
      d.price <= maxPrice
  );

    const handleCardClick = (device: Device) => {
    posthog.capture("clicked_device_card", {
      name: device.name,
      category: device.category,
      star: device.star,
    });

    navigate(`/devices/${device.category}/${device.id}`, {
      state: { fromTab: categoryName } 
    });
  };

  return (
    <div className="relative">
      {/* Hanging Cart */}
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
        <h3 className="text-lg font-semibold mb-2">Cart</h3>
        {cart.length > 0 ? (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm text-green-700">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Existing UI */}
      <div>
        {/* Filter controls: search + star filter */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label>Search:</Label>
            <Input
              className="w-64"
              value={search}
              placeholder="Enter device name..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

         

          <div className="flex items-center gap-2">
            <Label>Max Price:</Label>
            <Input
              type="number"
              className="w-32"
              placeholder="No limit"
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(isNaN(value) ? Infinity : value);
              }}
            />
          </div>
           {showStars && (
            <div className="flex items-center gap-2">
              <Label>Min Stars:</Label>
              <select
                title="Filter by minimum stars"
                className="border px-2 py-1 border-gray-500 " 
                value={minStars}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setMinStars(value);
                  posthog.capture("used_star_filter", { star: value });
                }}
              >
                <option value={0}>All</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={5}>5 only</option>
              </select>
            </div>
          )}
        </div>

        {/* Grid of device cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((device, i) => (
            <Card key={i}
            className="cursor-pointer hover:shadow-lg transition bg-white text-black"
            onClick={() => handleCardClick(device)}>
              <CardContent className="flex flex-col h-[580px] p-0 overflow-hidden">

                <div className="relative">
                  <picture>
                    <source
                      srcSet={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg.avif`}
                      type="image/avif"
                    />
                    <img
                      src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg`}
                      alt={device.name}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </picture>

                  {showStars && (
                    <img
                      src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/rating.png`}
                      alt="Rating"
                      className="absolute top-2 right-2 w-12 h-12 drop-shadow-md"
                    />
                  )}
                </div>


                <div className="p-4 flex flex-col flex-grow text-center space-y-2">
                 <h3 className="text-lg font-semibold min-h-[48px] flex items-center justify-center text-center">
                  {device.name}
                </h3>

                  <div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        device.condition === "Second Hand"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {device.condition}
                    </span>
                  </div>

                  {showStars && (
                    <p className="text-sm text-yellow-600 font-medium">
                      ⭐ {device.star} rating
                    </p>
                  )}

                  <p className="text-sm text-green-700 font-semibold">
                    ${device.price.toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-600 min-h-[60px]">
                    {device.description.slice(0, 200)}...
                    <button
                      className="text-blue-600 hover:underline ml-1"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        navigate(`/devices/${device.category}/${device.id}`);
                      }}
                    >
                      More details
                    </button>
                  </p>

                  <div className="flex-grow" />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(device);
                    }}
                  >
                    ADD TO CART
                  </Button>
                </div>

              </CardContent>

            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">
            No matching devices found in {categoryName}.
          </p>
        )}
      </div>
    </div>
  );
}
