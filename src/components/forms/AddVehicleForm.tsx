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
import { Plus, Car, Loader2 } from "lucide-react";
import { vehicleApi } from "@/lib/api";
import { useApiMutation } from "@/hooks/useApi";

interface AddVehicleFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddVehicleForm = ({ trigger, onSuccess }: AddVehicleFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    auction: "",
    purchaseDate: "",
    purchasePrice: "",
    chassisNumber: "",
    engineNumber: "",
    color: "",
    mileage: "",
    notes: "",
  });

  const mutation = useApiMutation({
    mutationFn: (data: typeof formData) => vehicleApi.create({
      name: data.name,
      year: parseInt(data.year),
      auctionHouse: data.auction,
      purchaseDate: data.purchaseDate,
      purchasePrice: parseFloat(data.purchasePrice),
      chassisNumber: data.chassisNumber || null,
      engineNumber: data.engineNumber || null,
      color: data.color || null,
      mileage: data.mileage ? parseInt(data.mileage) : null,
      notes: data.notes || null,
      status: 'purchased',
    }),
    successMessage: 'Vehicle added successfully!',
    invalidateQueries: ['vehicles'],
    onSuccess: () => {
      setOpen(false);
      setFormData({
        name: "",
        year: "",
        auction: "",
        purchaseDate: "",
        purchasePrice: "",
        chassisNumber: "",
        engineNumber: "",
        color: "",
        mileage: "",
        notes: "",
      });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Vehicle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                Record a vehicle purchase from auction
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vehicle Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Toyota Camry"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                placeholder="e.g., 2020"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auction">Auction *</Label>
              <Select
                value={formData.auction}
                onValueChange={(value) => setFormData({ ...formData, auction: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select auction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tokyo-auto">Tokyo Auto Auction</SelectItem>
                  <SelectItem value="osaka-premier">Osaka Premier Auction</SelectItem>
                  <SelectItem value="yokohama">Yokohama Auction</SelectItem>
                  <SelectItem value="tokyo-premium">Tokyo Premium Auto</SelectItem>
                  <SelectItem value="nagoya">Nagoya Auction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price (USD) *</Label>
              <Input
                id="purchasePrice"
                type="number"
                placeholder="e.g., 8500"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage (km)</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="e.g., 45000"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chassisNumber">Chassis Number</Label>
              <Input
                id="chassisNumber"
                placeholder="e.g., ABC123456789"
                value={formData.chassisNumber}
                onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineNumber">Engine Number</Label>
              <Input
                id="engineNumber"
                placeholder="e.g., ENG123456"
                value={formData.engineNumber}
                onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              placeholder="e.g., Pearl White"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this vehicle..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Vehicle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleForm;
