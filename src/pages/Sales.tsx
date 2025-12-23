import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingCart, Users, Gavel, DollarSign, Plus } from "lucide-react";
import { AddOrderForm, AddCustomerForm } from "@/components/forms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-001",
    customer: "Al Rashid Motors",
    items: 12,
    total: 15600,
    status: "completed",
    date: "2024-12-20",
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    customer: "Gulf Auto Parts",
    items: 8,
    total: 8900,
    status: "pending",
    date: "2024-12-19",
    paymentStatus: "pending",
  },
  {
    id: "ORD-003",
    customer: "Emirates Automotive",
    items: 25,
    total: 32400,
    status: "processing",
    date: "2024-12-18",
    paymentStatus: "partial",
  },
  {
    id: "ORD-004",
    customer: "Dubai Car Center",
    items: 5,
    total: 4500,
    status: "completed",
    date: "2024-12-17",
    paymentStatus: "paid",
  },
];

const customers = [
  { id: 1, name: "Al Rashid Motors", orders: 45, totalSpent: 156000, status: "active" },
  { id: 2, name: "Gulf Auto Parts", orders: 32, totalSpent: 98000, status: "active" },
  { id: 3, name: "Emirates Automotive", orders: 28, totalSpent: 145000, status: "active" },
  { id: 4, name: "Dubai Car Center", orders: 18, totalSpent: 52000, status: "inactive" },
];

const auctions = [
  { id: "AUC-001", container: "CT-2024-087", date: "Dec 25, 2024", items: 156, status: "upcoming" },
  { id: "AUC-002", container: "CT-2024-086", date: "Dec 22, 2024", items: 189, status: "ongoing" },
  { id: "AUC-003", container: "CT-2024-085", date: "Dec 15, 2024", items: 234, status: "completed" },
];

const orderStatusConfig = {
  completed: { label: "Completed", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  processing: { label: "Processing", className: "bg-info/10 text-info border-info/20" },
};

const paymentStatusConfig = {
  paid: { label: "Paid", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  partial: { label: "Partial", className: "bg-info/10 text-info border-info/20" },
};

const Sales = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales & Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage orders, customers, and Dubai auctions
            </p>
          </div>
          <AddOrderForm />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="bg-secondary">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="auctions" className="gap-2">
              <Gavel className="w-4 h-4" />
              Auctions
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => {
                    const orderStatus = orderStatusConfig[order.status as keyof typeof orderStatusConfig];
                    const paymentStatus = paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig];
                    return (
                      <TableRow
                        key={order.id}
                        className="animate-slide-in-left"
                        style={{ animationDelay: `${200 + index * 50}ms` }}
                      >
                        <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items} items</TableCell>
                        <TableCell className="font-semibold text-primary">
                          ${order.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("font-medium", orderStatus.className)}>
                            {orderStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("font-medium", paymentStatus.className)}>
                            {paymentStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {customers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all animate-fade-in"
                  style={{ animationDelay: `${200 + index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        customer.status === "active"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-muted/50 text-muted-foreground border-muted"
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{customer.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orders</span>
                      <span className="font-medium text-foreground">{customer.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Spent</span>
                      <span className="font-medium text-primary">${customer.totalSpent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Auctions Tab */}
          <TabsContent value="auctions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {auctions.map((auction, index) => (
                <div
                  key={auction.id}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all animate-fade-in"
                  style={{ animationDelay: `${200 + index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Gavel className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        auction.status === "upcoming" && "bg-info/10 text-info border-info/20",
                        auction.status === "ongoing" && "bg-success/10 text-success border-success/20",
                        auction.status === "completed" && "bg-muted/50 text-muted-foreground border-muted"
                      )}
                    >
                      {auction.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{auction.id}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{auction.container}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground">{auction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium text-foreground">{auction.items}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant={auction.status === "ongoing" ? "default" : "secondary"}>
                    {auction.status === "upcoming" ? "Schedule" : auction.status === "ongoing" ? "View Live" : "View Results"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Sales;
