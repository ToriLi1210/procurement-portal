import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import posthog from "posthog-js";

export type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
  price: number;
  condition: string;
};

export default function DeviceCard({
  device,
  showStars,
  onAddToCart,
  onDetail,
}: {
  device: Device;
  showStars?: boolean;
  onAddToCart: (device: Device) => void;
  onDetail:(device: Device) => void;
}) {


  return (
    <Card className="cursor-pointer hover:shadow-lg transition bg-white text-black">
      <CardContent className="flex flex-col h-[560px] p-0 overflow-hidden">
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
              src={`${import.meta.env.BASE_URL}images/starrating/${device.star} Stars.png`}
              alt={`${device.star} star rating`}
              className="absolute top-2 right-2 w-12 h-auto drop-shadow-md"
            />
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow text-center space-y-2">
          <h3 className="text-lg font-semibold min-h-[55px]">
            {device.name}
          </h3>

          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              device.condition === "Second Hand"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
                {device.condition}
          </span>

          {showStars && (
            <p className="text-sm text-yellow-600 font-medium">
              ⭐ {device.star} rating
            </p>
          )}

          {device.condition === "Brand New" && (
            <p className="text-sm text-green-700 font-semibold">
                ${device.price.toFixed(2)}
            </p>
          )}

          <p className="text-sm text-gray-600 flex-grow">
            {device.description.slice(0, 150)}...
            <button
                onClick={(e) => {
                e.stopPropagation()
                onDetail(device)
                }}
                className="ml-1 text-blue-600 hover:underline"
            >
                More details
            </button>
        </p>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(device);
                    }}
          >
            {device.condition === "Second Hand"
                ? "Free To Claim"
                : "Add To Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}