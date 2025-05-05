import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Upload, Filter, Info, Wrench, RefreshCw, Leaf, Clock, Layers } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ProcurementPortal() {
  const laptops = [
    { name: "Laptop Pro X", stars: 5, description: "Highly modular, long warranty, and energy-efficient." },
    { name: "EcoBook 13", stars: 4, description: "Repairable with good upgrade options." },
    { name: "QuickTech Z2", stars: 3, description: "Limited repairability, high energy consumption." },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">E-Waste Sustainable Procurement Portal</h1>

      <Tabs defaultValue="rated" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rated">⭐ Rated Devices</TabsTrigger>
          <TabsTrigger value="market">♻️ Marketplace</TabsTrigger>
          <TabsTrigger value="submit">📤 Submit New Product</TabsTrigger>
          <TabsTrigger value="criteria">📘 Rating Criteria</TabsTrigger>
        </TabsList>

        {/* Rated Devices Tab */}
        <TabsContent value="rated">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <Input placeholder="Filter by minimum stars (1-5)..." className="w-64" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {laptops.map((laptop, i) => (
                <Card key={i}>
                  <CardContent className="space-y-2 p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{laptop.name}</h2>
                      <div className="flex text-yellow-500">
                        {[...Array(laptop.stars)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{laptop.description}</p>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="market">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Monitor", "Printer", "Desktop Tower"].map((item, i) => (
              <Card key={i}>
                <CardContent className="space-y-2 p-4">
                  <img
                    src={`https://via.placeholder.com/300x180?text=${item}`}
                    alt={item}
                    className="rounded w-full object-cover"
                  />
                  <h2 className="text-lg font-semibold">{item} (Available)</h2>
                  <p className="text-sm text-gray-600">From: Engineering Faculty</p>
                  <Button variant="outline" size="sm">Claim</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Submit New Product Tab */}
        <TabsContent value="submit">
          <div className="space-y-4 max-w-md">
            <h2 className="text-xl font-semibold">Submit New Product for Rating</h2>
            <Input placeholder="Product Name" required />
            <Input placeholder="Manufacturer" required />
            <Input placeholder="Warranty Duration (years)" required />
            <Input placeholder="Repair Manual Availability (Yes/No)" required />
            <Input placeholder="Modularity / Upgrade Info" required />
            <Input placeholder="Take-back / Buy-back Program Details" required />
            <div>
              <Label>Upload Product Image</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Upload Technical Spec Sheet</Label>
              <Input type="file" accept="application/pdf" />
            </div>
            <Button>Submit for Review</Button>
          </div>
        </TabsContent>

        {/* Rating Criteria Tab */}
        <TabsContent value="criteria">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Repairability</h3>
                <p className="text-sm text-gray-700">Points are awarded for ease of disassembly, availability of repair manuals, and spare parts accessibility. Devices must allow non-destructive opening with common tools.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Modularity</h3>
                <p className="text-sm text-gray-700">Devices should have easily replaceable or upgradeable components such as RAM, batteries, or SSDs. High modularity reduces premature disposal.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <RefreshCw className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Manufacturer Programs</h3>
                <p className="text-sm text-gray-700">Incentives like trade-ins, take-back schemes, or responsible recycling partnerships contribute to this score.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Leaf className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Energy Efficiency</h3>
                <p className="text-sm text-gray-700">Products certified with Energy Star, EPEAT Gold, or that demonstrate low power consumption during standby and active use are rated higher.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Lifespan & Warranty</h3>
                <p className="text-sm text-gray-700">Longer manufacturer warranties, proven durability, and field-tested performance longevity contribute positively to sustainability ratings.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
