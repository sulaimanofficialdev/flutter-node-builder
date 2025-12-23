import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Container } from "lucide-react";
import { toast } from "sonner";

interface AddContainerFormProps {
  trigger?: React.ReactNode;
}

const AddContainerForm = ({ trigger }: AddContainerFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    containerId: "",
    origin: "",
    destination: "",
    shippingLine: "",
    bookingDate: "",
    estimatedDeparture: "",
    estimatedArrival: "",
    containerType: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Container data:", formData);
    toast.success("Container created successfully!");
    setOpen(false);
    setFormData({
      containerId: "",
      origin: "",
      destination: "",
      shippingLine: "",
      bookingDate: "",
      estimatedDeparture: "",
      estimatedArrival: "",
      containerType: "",
      notes: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Container
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Container className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Create New Container</DialogTitle>
              <DialogDescription>
                Set up a new container for shipment to Dubai
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="containerId">Container ID *</Label>
              <Input
                id="containerId"
                placeholder="e.g., CT-2024-090"
                value={formData.containerId}
                onChange={(e) => setFormData({ ...formData, containerId: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="containerType">Container Type *</Label>
              <Select
                value={formData.containerType}
                onValueChange={(value) => setFormData({ ...formData, containerType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20ft">20ft Standard</SelectItem>
                  <SelectItem value="40ft">40ft Standard</SelectItem>
                  <SelectItem value="40ft-hc">40ft High Cube</SelectItem>
                  <SelectItem value="45ft-hc">45ft High Cube</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin Port *</Label>
              <Select
                value={formData.origin}
                onValueChange={(value) => setFormData({ ...formData, origin: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                  <SelectItem value="osaka">Osaka, Japan</SelectItem>
                  <SelectItem value="yokohama">Yokohama, Japan</SelectItem>
                  <SelectItem value="nagoya">Nagoya, Japan</SelectItem>
                  <SelectItem value="kobe">Kobe, Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Port *</Label>
              <Select
                value={formData.destination}
                onValueChange={(value) => setFormData({ ...formData, destination: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai">Dubai, UAE</SelectItem>
                  <SelectItem value="jebel-ali">Jebel Ali, UAE</SelectItem>
                  <SelectItem value="sharjah">Sharjah, UAE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingLine">Shipping Line</Label>
            <Select
              value={formData.shippingLine}
              onValueChange={(value) => setFormData({ ...formData, shippingLine: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shipping line" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maersk">Maersk</SelectItem>
                <SelectItem value="msc">MSC</SelectItem>
                <SelectItem value="cosco">COSCO</SelectItem>
                <SelectItem value="evergreen">Evergreen</SelectItem>
                <SelectItem value="hapag-lloyd">Hapag-Lloyd</SelectItem>
                <SelectItem value="one">ONE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bookingDate">Booking Date</Label>
              <Input
                id="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDeparture">Est. Departure</Label>
              <Input
                id="estimatedDeparture"
                type="date"
                value={formData.estimatedDeparture}
                onChange={(e) => setFormData({ ...formData, estimatedDeparture: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedArrival">Est. Arrival</Label>
              <Input
                id="estimatedArrival"
                type="date"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this container..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Container</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContainerForm;
