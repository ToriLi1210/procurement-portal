import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SubmitProduct() {
  return (
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
  );
}
