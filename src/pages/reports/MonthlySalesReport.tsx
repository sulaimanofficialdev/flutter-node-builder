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
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyChartData = [
  { week: "Week 1", auctions: 12500, direct: 8200 },
  { week: "Week 2", auctions: 15800, direct: 9500 },
  { week: "Week 3", auctions: 11200, direct: 12100 },
  { week: "Week 4", auctions: 18500, direct: 10800 },
];

const salesData = [
  {
    id: "ORD-001",
    date: "2024-12-20",
    customer: "Ahmed Al-Rashid",
    items: "Engine Block, Transmission",
    type: "Direct",
    amount: 4500,
    status: "Completed",
  },
  {
    id: "ORD-002",
    date: "2024-12-19",
    customer: "Dubai Auto Parts",
    items: "3x Door Assembly, 2x Bumper",
    type: "Auction",
    amount: 3200,
    status: "Completed",
  },
  {
    id: "ORD-003",
    date: "2024-12-18",
    customer: "Mohammed Trading",
    items: "Complete Engine Set",
    type: "Direct",
    amount: 8500,
    status: "Completed",
  },
  {
    id: "ORD-004",
    date: "2024-12-17",
    customer: "Al Futtaim Motors",
    items: "5x Headlights, Radiator",
    type: "Auction",
    amount: 2100,
    status: "Completed",
  },
  {
    id: "ORD-005",
    date: "2024-12-16",
    customer: "Emirates Spare Parts",
    items: "Gearbox, Clutch Kit",
    type: "Direct",
    amount: 5800,
    status: "Pending Payment",
  },
  {
    id: "ORD-006",
    date: "2024-12-15",
    customer: "Sharjah Auto Market",
    items: "2x Suspension Set",
    type: "Auction",
    amount: 3400,
    status: "Completed",
  },
  {
    id: "ORD-007",
    date: "2024-12-14",
    customer: "Ajman Parts Co.",
    items: "ECU, Wiring Harness",
    type: "Direct",
    amount: 2900,
    status: "Completed",
  },
  {
    id: "ORD-008",
    date: "2024-12-13",
    customer: "RAK Motors",
    items: "Complete Dashboard",
    type: "Auction",
    amount: 1850,
    status: "Completed",
  },
];

const topCustomers = [
  { name: "Mohammed Trading", totalPurchases: 45600, orders: 12 },
  { name: "Dubai Auto Parts", totalPurchases: 38200, orders: 18 },
  { name: "Al Futtaim Motors", totalPurchases: 32100, orders: 15 },
  { name: "Emirates Spare Parts", totalPurchases: 28500, orders: 9 },
  { name: "Sharjah Auto Market", totalPurchases: 21800, orders: 14 },
];

const chartConfig = {
  auctions: { label: "Auctions", color: "hsl(var(--primary))" },
  direct: { label: "Direct Sales", color: "hsl(var(--success))" },
};

const MonthlySalesReport = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState("December 2024");

  const totals = salesData.reduce(
    (acc, item) => ({
      total: acc.total + item.amount,
      auctions: item.type === "Auction" ? acc.auctions + item.amount : acc.auctions,
      direct: item.type === "Direct" ? acc.direct + item.amount : acc.direct,
    }),
    { total: 0, auctions: 0, direct: 0 }
  );

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
                Monthly Sales Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Complete breakdown of all sales including auctions and direct sales
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

        {/* Month Selector */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "50ms" }}
        >
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-lg font-semibold min-w-[160px] text-center">
            {currentMonth}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Summary Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-xl font-bold text-success">
                  ${totals.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auction Sales</p>
                <p className="text-xl font-bold text-foreground">
                  ${totals.auctions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Direct Sales</p>
                <p className="text-xl font-bold text-foreground">
                  ${totals.direct.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-xl font-bold text-foreground">
                  {salesData.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Weekly Sales Breakdown
            </h3>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={monthlyChartData}>
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="auctions" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="direct" fill="hsl(var(--success))" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Top 5 Customers
            </h3>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.orders} orders
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-success">
                    ${customer.totalPurchases.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              All Transactions
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {sale.items}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sale.type === "Auction"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-success/10 text-success border-success/20"
                      }
                    >
                      {sale.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${sale.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sale.status === "Completed"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default MonthlySalesReport;
