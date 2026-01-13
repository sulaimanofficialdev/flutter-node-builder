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
import { Plus, Users, Loader2 } from "lucide-react";
import { customerApi } from "@/lib/api";
import { useApiMutation } from "@/hooks/useApi";

interface AddCustomerFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddCustomerForm = ({ trigger, onSuccess }: AddCustomerFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    taxId: "",
    paymentTerms: "",
    creditLimit: "",
    notes: "",
  });

  const mutation = useApiMutation({
    mutationFn: (data: typeof formData) => customerApi.create({
      name: data.contactPerson,
      company: data.companyName,
      email: data.email,
      phone: data.phone,
      address: data.address || null,
      city: data.city || null,
      country: data.country || null,
      taxId: data.taxId || null,
      paymentTerms: data.paymentTerms || null,
      creditLimit: data.creditLimit ? parseFloat(data.creditLimit) : 0,
      notes: data.notes || null,
      type: 'buyer',
      isActive: true,
    }),
    successMessage: 'Customer added successfully!',
    invalidateQueries: ['customers'],
    onSuccess: () => {
      setOpen(false);
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        taxId: "",
        paymentTerms: "",
        creditLimit: "",
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
            Add Customer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to your database
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., Al Rashid Motors"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                placeholder="e.g., Mohammed Al Rashid"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., info@alrashid.ae"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="e.g., +971 50 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Street address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., Dubai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">United Arab Emirates</SelectItem>
                  <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  <SelectItem value="qatar">Qatar</SelectItem>
                  <SelectItem value="kuwait">Kuwait</SelectItem>
                  <SelectItem value="bahrain">Bahrain</SelectItem>
                  <SelectItem value="oman">Oman</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / TRN</Label>
              <Input
                id="taxId"
                placeholder="e.g., 123456789"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select
                value={formData.paymentTerms}
                onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit ($)</Label>
              <Input
                id="creditLimit"
                type="number"
                placeholder="e.g., 50000"
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this customer..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
