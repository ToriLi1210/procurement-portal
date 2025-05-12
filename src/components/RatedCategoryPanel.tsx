import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import posthog from "posthog-js";




type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
  price: number;
};

export default function RatedCategoryPanel({
  categoryName,
  devices,
}: {
  categoryName: string;
  devices: Device[];
}) {
  const navigate = useNavigate();
  // State for search text input
  const [search, setSearch] = useState("");

  // State for minimum star rating filter
  const [minStars, setMinStars] = useState(0);

  const [maxPrice, setMaxPrice] = useState(Infinity);

  const [showStars, setShowStars] = useState(true);

  // Filter devices by search term and minimum star rating
  const filtered = devices.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      d.star >= minStars &&
      d.price <= maxPrice

  );
  const handleCardClick = (device: Device) => {
    posthog.capture('clicked_device_card', {
      name: device.name,
      category: device.category,
      star: device.star,
    });
    navigate(`/devices/${device.category}/${device.id}`);
  };
  

  return (
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

        {showStars && (
          <div className="flex items-center gap-2">
            <Label>Min Stars:</Label>
            <select
              className="border px-2 py-1 rounded"
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

          {/* Toggle switch without label, next to Max Price */}
          <input
            type="checkbox"
            checked={showStars}
            onChange={() => setShowStars(!showStars)}
            className="w-10 h-5 rounded-full bg-gray-300 appearance-none checked:bg-green-500 relative transition-all duration-300
              before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white
              before:transition-all before:duration-300 checked:before:translate-x-5"
          />
        </div>

      </div>
      

      {/* Grid of device cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map((device, i) => (
          <Card key={i}
          className="cursor-pointer hover:shadow-lg transition bg-white text-black"
          onClick={() => handleCardClick(device)}>
            <CardContent className="relative p-0 overflow-hidden">
              <div className="relative">
                {/* Main product image with AVIF fallback */}
                <picture>
                  <source
                    srcSet={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg.avif`}
                    type="image/avif"
                  />
                  <img
                    src={`/${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg`}
                    alt={device.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </picture>

                {/* Overlay rating badge (image) */}
                {showStars && (
                  <img
                    src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/rating.png`}
                    alt="Rating"
                    className="absolute top-2 right-2 w-12 h-12 drop-shadow-md"
                  />
                )}

              </div>

              {/* Device details: star + description + button */}
              <div className="p-4 flex flex-col items-center text-center space-y-2">
                <h3 className="text-lg font-semibold">{device.name}</h3>
                {showStars && (
                  <p className="text-sm text-yellow-600 font-medium">
                    ⭐ {device.star} rating
                  </p>
                )}
                <p className="text-sm text-green-700 font-semibold">${device.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{device.description}</p>
                {/* Prevent click from bubbling up */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 🔧 Here you can add to cart logic
                    toast.success(`${device.name} added to cart`, {
                      description: "Check your cart to review.",
                    });
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
  );
}
