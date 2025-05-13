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

type DeviceDetailProps = {
  showStars: boolean;
};

export default function DeviceDetail({ showStars }: DeviceDetailProps) {
  const { category, id } = useParams();
  const navigate = useNavigate();

  if (!category || !id) return <p>Invalid device path.</p>;

  const allDevices: Device[] = Object.values(rawData).flat();
  const device = allDevices.find(
    (d) => d.category === category.toLowerCase() && d.id === id
  );

  if (!device) {
    return <p className="p-4 text-gray-600">Device not found.</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
        ← Back
      </Button>

      {/* Device Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <picture>
            <source
              srcSet={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg.avif`}
              type="image/avif"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/devices/${device.category}/${device.id}/Product.jpg`}
              alt={device.name}
              className="w-full rounded-lg object-cover aspect-[4/3] shadow-lg"
            />
          </picture>
        </div>

        {/* Device Info */}
        <div className="flex-grow space-y-4">
          {/* Organize device name, stars, and price into a more elegant layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Device Name */}
            <h1 className="text-4xl font-bold text-gray-800">{device.name}</h1>

            {/* Price */}
            <p className="text-green-700 text-2xl font-semibold">
              ${device.price.toFixed(2)}
            </p>
          </div>

          {/* Stars */}
          {showStars && (
            <div className="flex items-center gap-2">
              <div className="star-rating-container">
                <div
                  className="star-rating-fill"
                  style={{ width: `${(device.star / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-yellow-600 font-medium text-lg">
                ⭐ {device.star} rating
              </p>
            </div>
          )}

          {/* Description Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Description
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {device.description}
            </p>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {showStars && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sustainability Specifications
          </h2>
          <table className="w-full border-collapse text-left">
            <tbody>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Overall Score
                </th>
                <td className="border-b p-3">{device.sustainabilityScore}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Warranty
                </th>
                <td className="border-b p-3">{device.warranty}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Repairability
                </th>
                <td className="border-b p-3">{device.repairability}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Modularity
                </th>
                <td className="border-b p-3">{device.modularity}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Lifespan
                </th>
                <td className="border-b p-3">{device.lifespan}</td>
              </tr>
              <tr>
                <th className="border-b p-3 font-medium text-gray-600">
                  Build Quality
                </th>
                <td className="border-b p-3">{device.buildQuality}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}