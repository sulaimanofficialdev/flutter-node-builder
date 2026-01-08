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
  Building2,
  Home,
  TrendingUp,
  TrendingDown,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ReportTableActions, DetailField } from "@/components/reports";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const propertyData = [
  {
    id: "PROP-001",
    name: "Deira Shop Unit A",
    type: "Shop",
    location: "Deira, Dubai",
    tenant: "Al Rashid Auto Parts",
    monthlyRent: 8500,
    maintenanceCost: 450,
    utilityCost: 280,
    netIncome: 7770,
    status: "Occupied",
    leaseEnd: "2025-06-30",
  },
  {
    id: "PROP-002",
    name: "Sharjah Warehouse",
    type: "Shop",
    location: "Sharjah Industrial",
    tenant: "Emirates Motors",
    monthlyRent: 12000,
    maintenanceCost: 800,
    utilityCost: 520,
    netIncome: 10680,
    status: "Occupied",
    leaseEnd: "2025-12-31",
  },
  {
    id: "PROP-003",
    name: "Staff Residence Villa",
    type: "Home",
    location: "Al Quoz, Dubai",
    tenant: "Staff Housing",
    monthlyRent: 0,
    maintenanceCost: 600,
    utilityCost: 450,
    netIncome: -1050,
    status: "Company Use",
    leaseEnd: "N/A",
  },
  {
    id: "PROP-004",
    name: "Karama Shop Unit B",
    type: "Shop",
    location: "Karama, Dubai",
    tenant: "Quick Parts Trading",
    monthlyRent: 6500,
    maintenanceCost: 350,
    utilityCost: 200,
    netIncome: 5950,
    status: "Occupied",
    leaseEnd: "2025-03-31",
  },
  {
    id: "PROP-005",
    name: "Manager Apartment",
    type: "Home",
    location: "Business Bay, Dubai",
    tenant: "Ahmed Hassan",
    monthlyRent: 0,
    maintenanceCost: 400,
    utilityCost: 350,
    netIncome: -750,
    status: "Company Use",
    leaseEnd: "N/A",
  },
  {
    id: "PROP-006",
    name: "Ajman Shop Unit",
    type: "Shop",
    location: "Ajman Industrial",
    tenant: "—",
    monthlyRent: 0,
    maintenanceCost: 200,
    utilityCost: 0,
    netIncome: -200,
    status: "Vacant",
    leaseEnd: "N/A",
  },
];

const monthlyData = [
  { month: "Jul", income: 25000, expenses: 3800 },
  { month: "Aug", income: 27000, expenses: 4200 },
  { month: "Sep", income: 27000, expenses: 3600 },
  { month: "Oct", income: 27000, expenses: 4500 },
  { month: "Nov", income: 27000, expenses: 3900 },
  { month: "Dec", income: 27000, expenses: 4050 },
];

const chartConfig = {
  income: { label: "Income", color: "hsl(var(--success))" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
};

const PropertyIncomeReport = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredData = propertyData.filter((item) => {
    if (type !== "all" && item.type !== type) return false;
    if (status !== "all" && item.status !== status) return false;
    return true;
  });

  const totals = filteredData.reduce(
    (acc, item) => ({
      monthlyRent: acc.monthlyRent + item.monthlyRent,
      maintenanceCost: acc.maintenanceCost + item.maintenanceCost,
      utilityCost: acc.utilityCost + item.utilityCost,
      netIncome: acc.netIncome + item.netIncome,
    }),
    { monthlyRent: 0, maintenanceCost: 0, utilityCost: 0, netIncome: 0 }
  );

  const occupiedCount = propertyData.filter((p) => p.status === "Occupied").length;
  const vacantCount = propertyData.filter((p) => p.status === "Vacant").length;

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
                Property Income Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Rental income and expenses for all company properties
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
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-xl font-bold text-foreground">
                  {propertyData.length}
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
                <p className="text-sm text-muted-foreground">Monthly Rent Income</p>
                <p className="text-xl font-bold text-success">
                  ${totals.monthlyRent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <p className="text-xl font-bold text-destructive">
                  ${(totals.maintenanceCost + totals.utilityCost).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  totals.netIncome >= 0 ? "bg-success/10" : "bg-destructive/10"
                }`}
              >
                {totals.netIncome >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Monthly Income</p>
                <p
                  className={`text-xl font-bold ${
                    totals.netIncome >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {totals.netIncome >= 0 ? "+" : ""}$
                  {totals.netIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy & Chart */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              6-Month Income vs Expenses
            </h3>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="income" fill="hsl(var(--success))" radius={4} />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Property Overview
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Shops</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {propertyData.filter((p) => p.type === "Shop").length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-4 h-4 text-info" />
                    <span className="text-sm text-muted-foreground">Homes</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {propertyData.filter((p) => p.type === "Home").length}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-success/10 text-center">
                  <p className="text-lg font-bold text-success">{occupiedCount}</p>
                  <p className="text-xs text-muted-foreground">Occupied</p>
                </div>
                <div className="p-3 rounded-lg bg-info/10 text-center">
                  <p className="text-lg font-bold text-info">
                    {propertyData.filter((p) => p.status === "Company Use").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Company Use</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 text-center">
                  <p className="text-lg font-bold text-warning">{vacantCount}</p>
                  <p className="text-xs text-muted-foreground">Vacant</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Annual Net Income (Projected)</span>
                  <span className="font-bold text-lg text-primary">
                    ${(totals.netIncome * 12).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Shop">Shop</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Company Use">Company Use</SelectItem>
              <SelectItem value="Vacant">Vacant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Table */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead className="text-right">Monthly Rent</TableHead>
                <TableHead className="text-right">Maintenance</TableHead>
                <TableHead className="text-right">Utilities</TableHead>
                <TableHead className="text-right">Net Income</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lease End</TableHead>
                <TableHead className="w-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-medium">{prop.id}</TableCell>
                  <TableCell>{prop.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        prop.type === "Shop"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-info/10 text-info border-info/20"
                      }
                    >
                      {prop.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{prop.location}</TableCell>
                  <TableCell>{prop.tenant}</TableCell>
                  <TableCell className="text-right">
                    {prop.monthlyRent > 0
                      ? `$${prop.monthlyRent.toLocaleString()}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -${prop.maintenanceCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -${prop.utilityCost.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      prop.netIncome >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {prop.netIncome >= 0 ? "+" : ""}$
                    {prop.netIncome.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        prop.status === "Occupied"
                          ? "bg-success/10 text-success border-success/20"
                          : prop.status === "Company Use"
                          ? "bg-info/10 text-info border-info/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {prop.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{prop.leaseEnd}</TableCell>
                  <TableCell>
                    <ReportTableActions
                      itemId={prop.id}
                      itemName={prop.name}
                      onViewDetail={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      detailContent={
                        <div className="grid grid-cols-2 gap-4">
                          <DetailField label="Property ID" value={prop.id} />
                          <DetailField label="Name" value={prop.name} />
                          <DetailField label="Type" value={prop.type} />
                          <DetailField label="Location" value={prop.location} />
                          <DetailField label="Tenant" value={prop.tenant} />
                          <DetailField label="Monthly Rent" value={prop.monthlyRent > 0 ? `$${prop.monthlyRent.toLocaleString()}` : "—"} />
                          <DetailField label="Maintenance" value={`-$${prop.maintenanceCost.toLocaleString()}`} />
                          <DetailField label="Utilities" value={`-$${prop.utilityCost.toLocaleString()}`} />
                          <DetailField label="Net Income" value={`${prop.netIncome >= 0 ? '+' : ''}$${prop.netIncome.toLocaleString()}`} />
                          <DetailField label="Status" value={prop.status} />
                          <DetailField label="Lease End" value={prop.leaseEnd} />
                        </div>
                      }
                      editContent={
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input defaultValue={prop.name} />
                          </div>
                          <div className="space-y-2">
                            <Label>Tenant</Label>
                            <Input defaultValue={prop.tenant} />
                          </div>
                          <div className="space-y-2">
                            <Label>Monthly Rent</Label>
                            <Input type="number" defaultValue={prop.monthlyRent} />
                          </div>
                          <div className="space-y-2">
                            <Label>Maintenance Cost</Label>
                            <Input type="number" defaultValue={prop.maintenanceCost} />
                          </div>
                          <div className="space-y-2">
                            <Label>Utility Cost</Label>
                            <Input type="number" defaultValue={prop.utilityCost} />
                          </div>
                          <div className="space-y-2">
                            <Label>Lease End Date</Label>
                            <Input defaultValue={prop.leaseEnd} />
                          </div>
                        </div>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={5}>TOTAL</TableCell>
                <TableCell className="text-right">
                  ${totals.monthlyRent.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-destructive">
                  -${totals.maintenanceCost.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-destructive">
                  -${totals.utilityCost.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    totals.netIncome >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {totals.netIncome >= 0 ? "+" : ""}$
                  {totals.netIncome.toLocaleString()}
                </TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default PropertyIncomeReport;
