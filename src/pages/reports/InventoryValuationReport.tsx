import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Download,
  Package,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Printer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const inventoryData = [
  {
    id: "INV-001",
    partName: "Toyota Camry Engine 2.5L",
    category: "Engines",
    location: "Dubai",
    quantity: 5,
    unitCost: 2500,
    marketValue: 3200,
    condition: "Excellent",
    ageInDays: 15,
  },
  {
    id: "INV-002",
    partName: "Honda Civic Transmission",
    category: "Transmission",
    location: "Dubai",
    quantity: 3,
    unitCost: 1800,
    marketValue: 2400,
    condition: "Good",
    ageInDays: 22,
  },
  {
    id: "INV-003",
    partName: "Nissan Altima Door Assembly",
    category: "Body Parts",
    location: "Japan",
    quantity: 12,
    unitCost: 350,
    marketValue: 500,
    condition: "Excellent",
    ageInDays: 8,
  },
  {
    id: "INV-004",
    partName: "BMW 3 Series Headlight Set",
    category: "Electrical",
    location: "Dubai",
    quantity: 8,
    unitCost: 450,
    marketValue: 650,
    condition: "Good",
    ageInDays: 30,
  },
  {
    id: "INV-005",
    partName: "Mercedes C-Class Radiator",
    category: "Cooling",
    location: "Japan",
    quantity: 6,
    unitCost: 280,
    marketValue: 400,
    condition: "Excellent",
    ageInDays: 12,
  },
  {
    id: "INV-006",
    partName: "Lexus RX350 Suspension Kit",
    category: "Suspension",
    location: "Dubai",
    quantity: 4,
    unitCost: 1200,
    marketValue: 1600,
    condition: "Good",
    ageInDays: 45,
  },
  {
    id: "INV-007",
    partName: "Audi A4 ECU Module",
    category: "Electrical",
    location: "Japan",
    quantity: 10,
    unitCost: 600,
    marketValue: 850,
    condition: "Excellent",
    ageInDays: 5,
  },
  {
    id: "INV-008",
    partName: "Ford Mustang Bumper",
    category: "Body Parts",
    location: "Dubai",
    quantity: 7,
    unitCost: 420,
    marketValue: 580,
    condition: "Fair",
    ageInDays: 60,
  },
];

const categoryBreakdown = [
  { category: "Engines", value: 45000, percentage: 32 },
  { category: "Transmission", value: 28500, percentage: 20 },
  { category: "Body Parts", value: 24200, percentage: 17 },
  { category: "Electrical", value: 21800, percentage: 15 },
  { category: "Suspension", value: 12400, percentage: 9 },
  { category: "Cooling", value: 9600, percentage: 7 },
];

const InventoryValuationReport = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("all");
  const [category, setCategory] = useState("all");

  const filteredData = inventoryData.filter((item) => {
    if (location !== "all" && item.location !== location) return false;
    if (category !== "all" && item.category !== category) return false;
    return true;
  });

  const totals = filteredData.reduce(
    (acc, item) => ({
      quantity: acc.quantity + item.quantity,
      totalCost: acc.totalCost + item.unitCost * item.quantity,
      marketValue: acc.marketValue + item.marketValue * item.quantity,
    }),
    { quantity: 0, totalCost: 0, marketValue: 0 }
  );

  const potentialProfit = totals.marketValue - totals.totalCost;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/reports")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Inventory Valuation Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Current value of all inventory across Japan and Dubai locations
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-xl font-bold text-foreground">
                  {totals.quantity}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-xl font-bold text-foreground">
                  ${totals.totalCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Value</p>
                <p className="text-xl font-bold text-success">
                  ${totals.marketValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Potential Profit</p>
                <p className="text-xl font-bold text-warning">
                  +${potentialProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Summary */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Japan Warehouse</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value</span>
                <span className="font-medium text-success">$52,400</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-info" />
              <span className="font-semibold text-foreground">Dubai Warehouse</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value</span>
                <span className="font-medium text-success">$89,100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
              <SelectItem value="Dubai">Dubai</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Engines">Engines</SelectItem>
              <SelectItem value="Transmission">Transmission</SelectItem>
              <SelectItem value="Body Parts">Body Parts</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Suspension">Suspension</SelectItem>
              <SelectItem value="Cooling">Cooling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Breakdown */}
        <div
          className="rounded-xl border border-border bg-card p-6 animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Value by Category
          </h3>
          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{cat.category}</span>
                  <span className="text-muted-foreground">
                    ${cat.value.toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                <Progress value={cat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Part Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="text-center">Age (Days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.partName}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.location === "Japan"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-info/10 text-info border-info/20"
                      }
                    >
                      {item.location}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.unitCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.marketValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-success">
                    ${(item.marketValue * item.quantity).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.condition === "Excellent"
                          ? "bg-success/10 text-success border-success/20"
                          : item.condition === "Good"
                          ? "bg-info/10 text-info border-info/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {item.condition}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        item.ageInDays > 45
                          ? "text-destructive"
                          : item.ageInDays > 30
                          ? "text-warning"
                          : "text-muted-foreground"
                      }
                    >
                      {item.ageInDays}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Aging Alert */}
        <div
          className="rounded-xl border border-warning/50 bg-warning/5 p-4 flex items-start gap-3 animate-fade-in"
          style={{ animationDelay: "350ms" }}
        >
          <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Aging Inventory Alert</p>
            <p className="text-sm text-muted-foreground">
              2 items have been in inventory for more than 45 days. Consider
              discounting or prioritizing these items for quick sale.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InventoryValuationReport;
