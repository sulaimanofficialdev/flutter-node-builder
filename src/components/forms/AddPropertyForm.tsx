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
import { Plus, Building2, Loader2 } from "lucide-react";
import { propertyApi } from "@/lib/api";
import { useApiMutation } from "@/hooks/useApi";

interface AddPropertyFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddPropertyForm = ({ trigger, onSuccess }: AddPropertyFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    size: "",
    status: "",
    value: "",
    monthlyRent: "",
    monthlyExpense: "",
    purchaseDate: "",
    notes: "",
  });

  const mutation = useApiMutation({
    mutationFn: (data: typeof formData) => propertyApi.create({
      name: data.name,
      type: data.type,
      address: data.address,
      size: data.size ? parseInt(data.size) : null,
      ownership: data.status,
      propertyValue: data.value ? parseFloat(data.value) : null,
      monthlyRent: data.monthlyRent ? parseFloat(data.monthlyRent) : null,
      monthlyExpenses: data.monthlyExpense ? parseFloat(data.monthlyExpense) : null,
      purchaseDate: data.purchaseDate || null,
      notes: data.notes || null,
      status: 'active',
    }),
    successMessage: 'Property added successfully!',
    invalidateQueries: ['properties'],
    onSuccess: () => {
      setOpen(false);
      setFormData({
        name: "",
        type: "",
        address: "",
        size: "",
        status: "",
        value: "",
        monthlyRent: "",
        monthlyExpense: "",
        purchaseDate: "",
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
            Add Property
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Add a company property or rental asset
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Dubai Warehouse C"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              placeholder="Full property address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Size (sqft)</Label>
              <Input
                id="size"
                placeholder="e.g., 5000"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owned">Owned</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="leased-out">Leased Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Property Value ($)</Label>
              <Input
                id="value"
                type="number"
                placeholder="e.g., 500000"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Monthly Income ($)</Label>
              <Input
                id="monthlyRent"
                type="number"
                placeholder="e.g., 3500"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyExpense">Monthly Expense ($)</Label>
              <Input
                id="monthlyExpense"
                type="number"
                placeholder="e.g., 500"
                value={formData.monthlyExpense}
                onChange={(e) => setFormData({ ...formData, monthlyExpense: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this property..."
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
              Add Property
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyForm;
