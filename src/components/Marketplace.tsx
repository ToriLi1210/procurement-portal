import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = ["Monitor", "Printer", "Desktop Tower"];

export default function Marketplace() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
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
  );
}
