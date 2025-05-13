import { useParams, useNavigate } from "react-router-dom";
import rawData from "@/data/devices.json";
import { Button } from "@/components/ui/button";

type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  star: number;
  sustainabilityScore: number;
  warranty: string;
  repairability: string;
  modularity: string;
  lifespan: string;
  buildQuality: string;
  price: number;
};

// Update the props to accept showStars
type DeviceDetailProps = {
  showStars: boolean;
};

export default function DeviceDetail({ showStars }: DeviceDetailProps) {
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

      <div className="flex flex-col md:flex-row space-x-4">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-center">{device.name}</h1>

         
          {showStars && (
            <div className="text-center">
              <p className="text-yellow-600 font-medium">⭐ {device.star} rating</p>
            </div>
          )}
          <div className="text-center">
            <p className="text-green-700 font-semibold">${device.price.toFixed(2)}</p>
          </div>

          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg.avif`}
              type="image/avif"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg`}
              alt={device.name}
              className="w-full rounded-lg object-cover aspect-[4/3]"
            />
          </picture>
        </div>

        {/* Conditionally render specifications table */}
        {showStars && (
          <div className="md:w-1/3 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <table className="min-w-full border-collapse">
              <tbody>
                <tr>
                  <th className="border-b p-2 text-left">Sustainability Score</th>
                  <td className="border-b p-2">{device.sustainabilityScore}</td>
                </tr>
                <tr>
                  <th className="border-b p-2 text-left">Warranty</th>
                  <td className="border-b p-2">{device.warranty}</td>
                </tr>
                <tr>
                  <th className="border-b p-2 text-left">Repairability</th>
                  <td className="border-b p-2">{device.repairability}</td>
                </tr>
                <tr>
                  <th className="border-b p-2 text-left">Modularity</th>
                  <td className="border-b p-2">{device.modularity}</td>
                </tr>
                <tr>
                  <th className="border-b p-2 text-left">Lifespan</th>
                  <td className="border-b p-2">{device.lifespan}</td>
                </tr>
                <tr>
                  <th className="border-b p-2 text-left">Build Quality</th>
                  <td className="border-b p-2">{device.buildQuality}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Description below the table and img */}
      <p className="text-gray-700 text-lg mt-6">{device.description}</p>
    </div>
  );
}