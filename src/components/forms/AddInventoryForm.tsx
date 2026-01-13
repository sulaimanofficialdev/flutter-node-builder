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
import { Plus, Package, Loader2 } from "lucide-react";
import { inventoryApi } from "@/lib/api";
import { useApiMutation } from "@/hooks/useApi";

interface AddInventoryFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddInventoryForm = ({ trigger, onSuccess }: AddInventoryFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    location: "",
    price: "",
    condition: "",
    sourceType: "",
    sourceId: "",
    partNumber: "",
    notes: "",
  });

  const mutation = useApiMutation({
    mutationFn: (data: typeof formData) => inventoryApi.create({
      partName: data.name,
      partNumber: data.partNumber || null,
      category: data.category,
      quantity: parseInt(data.quantity),
      location: data.location,
      costPrice: parseFloat(data.price),
      sellingPrice: parseFloat(data.price) * 1.3, // 30% markup default
      condition: data.condition,
      sourceType: data.sourceType || null,
      sourceId: data.sourceId || null,
      notes: data.notes || null,
      status: 'in_stock',
    }),
    successMessage: 'Inventory item added successfully!',
    invalidateQueries: ['inventory'],
    onSuccess: () => {
      setOpen(false);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        location: "",
        price: "",
        condition: "",
        sourceType: "",
        sourceId: "",
        partNumber: "",
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
            Add Item
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>
                Add a new spare part or item to inventory
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Engine Block - Toyota 2.5L"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partNumber">Part Number</Label>
              <Input
                id="partNumber"
                placeholder="e.g., ENG-T25-001"
                value={formData.partNumber}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine">Engine Parts</SelectItem>
                  <SelectItem value="transmission">Transmission</SelectItem>
                  <SelectItem value="body">Body Parts</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="suspension">Suspension</SelectItem>
                  <SelectItem value="brakes">Brakes</SelectItem>
                  <SelectItem value="interior">Interior</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 10"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Unit Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 250"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="japan-warehouse">Japan Warehouse</SelectItem>
                  <SelectItem value="dubai-warehouse-a">Dubai Warehouse A</SelectItem>
                  <SelectItem value="dubai-warehouse-b">Dubai Warehouse B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sourceType">Source Type</Label>
              <Select
                value={formData.sourceType}
                onValueChange={(value) => setFormData({ ...formData, sourceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicle">Dismantled Vehicle</SelectItem>
                  <SelectItem value="container">Container Import</SelectItem>
                  <SelectItem value="purchase">Direct Purchase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sourceId">Source ID</Label>
              <Input
                id="sourceId"
                placeholder="e.g., VH-001 or CT-2024-087"
                value={formData.sourceId}
                onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this item..."
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
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryForm;
