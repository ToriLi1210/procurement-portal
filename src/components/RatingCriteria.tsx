import { Wrench, Layers, RefreshCw, Leaf, Clock } from "lucide-react";

const criteria = [
  {
    icon: Wrench,
    title: "Repairability",
    description: "Points are awarded for ease of disassembly, availability of repair manuals, and spare parts accessibility. Devices must allow non-destructive opening with common tools."
  },
  {
    icon: Layers,
    title: "Modularity",
    description: "Devices should have easily replaceable or upgradeable components such as RAM, batteries, or SSDs. High modularity reduces premature disposal."
  },
  {
    icon: RefreshCw,
    title: "Manufacturer Programs",
    description: "Incentives like trade-ins, take-back schemes, or responsible recycling partnerships contribute to this score."
  },
  {
    icon: Leaf,
    title: "Energy Efficiency",
    description: "Products certified with Energy Star, EPEAT Gold, or that demonstrate low power consumption during standby and active use are rated higher."
  },
  {
    icon: Clock,
    title: "Lifespan & Warranty",
    description: "Longer manufacturer warranties, proven durability, and field-tested performance longevity contribute positively to sustainability ratings."
  },
];

export default function RatingCriteria() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {criteria.map((item, i) => (
        <div key={i} className="flex items-start gap-4">
          <item.icon className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
