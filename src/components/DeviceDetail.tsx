import { useParams, useNavigate } from "react-router-dom";
import rawData from "@/data/devices.json";
import { Button } from "@/components/ui/button";

type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
};

export default function DeviceDetail() {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Fallback if route params are missing
  if (!category || !id) return <p>Invalid device path.</p>;

  // Try to find the device in all categories
  const allDevices: Device[] = Object.values(rawData).flat();
  const device = allDevices.find(
    (d) => d.category === category.toLowerCase() && d.id === id
  );

  if (!device) {
    return <p className="p-4 text-gray-600">Device not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Button onClick={() => navigate(-1)} variant="outline">
        ← Back
      </Button>

      <h1 className="text-3xl font-bold">{device.name}</h1>
      <p className="text-yellow-600 font-medium">⭐ {device.star} rating</p>

      <picture>
        <source
          srcSet={`/images/devices/${device.category}/${device.id}/Product.jpg.avif`}
          type="image/avif"
        />
        <img
          src={`/images/devices/${device.category}/${device.id}/Product.jpg`}
          alt={device.name}
          className="w-full rounded-lg object-cover aspect-[4/3]"
        />
      </picture>

      <p className="text-gray-700 text-lg">{device.description}</p>

      {/* You can add more info here like specs, buy links, etc. */}
    </div>
  );
}
