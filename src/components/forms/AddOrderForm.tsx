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
import { Plus, ShoppingCart, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { orderApi } from "@/lib/api";
import { useApiMutation } from "@/hooks/useApi";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface AddOrderFormProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddOrderForm = ({ trigger, onSuccess }: AddOrderFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    orderDate: "",
    paymentMethod: "",
    paymentStatus: "",
    notes: "",
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, price: 0 });

  const addItem = () => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      setOrderItems([
        ...orderItems,
        { ...newItem, id: `item-${Date.now()}` },
      ]);
      setNewItem({ name: "", quantity: 1, price: 0 });
    }
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const mutation = useApiMutation({
    mutationFn: (data: { formData: typeof formData; items: OrderItem[]; total: number }) => 
      orderApi.create({
        customerId: data.formData.customer, // This would be a real customer ID from API
        orderDate: data.formData.orderDate,
        paymentMethod: data.formData.paymentMethod || null,
        paymentStatus: data.formData.paymentStatus || 'pending',
        notes: data.formData.notes || null,
        totalAmount: data.total,
        items: data.items.map(item => ({
          description: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.quantity * item.price,
        })),
        status: 'pending',
      }),
    successMessage: 'Order created successfully!',
    invalidateQueries: ['orders'],
    onSuccess: () => {
      setOpen(false);
      setFormData({
        customer: "",
        orderDate: "",
        paymentMethod: "",
        paymentStatus: "",
        notes: "",
      });
      setOrderItems([]);
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      toast.error("Please add at least one item to the order");
      return;
    }
    mutation.mutate({ formData, items: orderItems, total: totalAmount });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Order
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Create a new sales order for a customer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select
                value={formData.customer}
                onValueChange={(value) => setFormData({ ...formData, customer: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="al-rashid">Al Rashid Motors</SelectItem>
                  <SelectItem value="gulf-auto">Gulf Auto Parts</SelectItem>
                  <SelectItem value="emirates">Emirates Automotive</SelectItem>
                  <SelectItem value="dubai-car">Dubai Car Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date *</Label>
              <Input
                id="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => setFormData({ ...formData, paymentStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <Label>Order Items *</Label>
            <div className="rounded-lg border border-border p-4 space-y-3 bg-secondary/20">
              <div className="grid grid-cols-[1fr,80px,100px,40px] gap-2 items-end">
                <div className="space-y-1">
                  <Label className="text-xs">Item Name</Label>
                  <Input
                    placeholder="e.g., Engine Block"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Price ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button type="button" size="icon" onClick={addItem}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {orderItems.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-background"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-foreground">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          x{item.quantity} @ ${item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">
                          ${(item.quantity * item.price).toLocaleString()}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this order..."
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
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderForm;
