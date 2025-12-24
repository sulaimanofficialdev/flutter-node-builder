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
  Container,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Printer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const containerData = [
  {
    id: "CNT-2024-001",
    shipDate: "2024-11-15",
    arrivalDate: "2024-12-01",
    totalCars: 8,
    purchaseCost: 45000,
    shippingCost: 8500,
    customsDuty: 3200,
    otherExpenses: 1500,
    totalSales: 72000,
    unsoldValue: 5200,
    profit: 18800,
    status: "Completed",
  },
  {
    id: "CNT-2024-002",
    shipDate: "2024-11-20",
    arrivalDate: "2024-12-05",
    totalCars: 6,
    purchaseCost: 38000,
    shippingCost: 8500,
    customsDuty: 2800,
    otherExpenses: 1200,
    totalSales: 58000,
    unsoldValue: 8500,
    profit: 16000,
    status: "Completed",
  },
  {
    id: "CNT-2024-003",
    shipDate: "2024-11-28",
    arrivalDate: "2024-12-12",
    totalCars: 10,
    purchaseCost: 52000,
    shippingCost: 8500,
    customsDuty: 3800,
    otherExpenses: 1800,
    totalSales: 45000,
    unsoldValue: 22000,
    profit: 900,
    status: "In Progress",
  },
  {
    id: "CNT-2024-004",
    shipDate: "2024-12-05",
    arrivalDate: "2024-12-18",
    totalCars: 7,
    purchaseCost: 42000,
    shippingCost: 8500,
    customsDuty: 3100,
    otherExpenses: 1400,
    totalSales: 28000,
    unsoldValue: 35000,
    profit: 8000,
    status: "In Progress",
  },
  {
    id: "CNT-2024-005",
    shipDate: "2024-12-10",
    arrivalDate: "2024-12-22",
    totalCars: 5,
    purchaseCost: 35000,
    shippingCost: 8500,
    customsDuty: 2600,
    otherExpenses: 1100,
    totalSales: 0,
    unsoldValue: 52000,
    profit: 4800,
    status: "Pending Sale",
  },
];

const ContainerProfitLossReport = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredData = containerData.filter((item) => {
    if (status !== "all" && item.status !== status) return false;
    return true;
  });

  const totals = filteredData.reduce(
    (acc, item) => ({
      totalCars: acc.totalCars + item.totalCars,
      purchaseCost: acc.purchaseCost + item.purchaseCost,
      shippingCost: acc.shippingCost + item.shippingCost,
      customsDuty: acc.customsDuty + item.customsDuty,
      otherExpenses: acc.otherExpenses + item.otherExpenses,
      totalSales: acc.totalSales + item.totalSales,
      unsoldValue: acc.unsoldValue + item.unsoldValue,
      profit: acc.profit + item.profit,
    }),
    {
      totalCars: 0,
      purchaseCost: 0,
      shippingCost: 0,
      customsDuty: 0,
      otherExpenses: 0,
      totalSales: 0,
      unsoldValue: 0,
      profit: 0,
    }
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
                Container Profit/Loss Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Detailed analysis of profit or loss per container including
                unsold inventory valuation
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
                <Container className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Containers
                </p>
                <p className="text-xl font-bold text-foreground">
                  {filteredData.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cars</p>
                <p className="text-xl font-bold text-foreground">
                  {totals.totalCars}
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
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-xl font-bold text-success">
                  ${totals.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  totals.profit >= 0 ? "bg-success/10" : "bg-destructive/10"
                }`}
              >
                {totals.profit >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p
                  className={`text-xl font-bold ${
                    totals.profit >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {totals.profit >= 0 ? "+" : ""}$
                  {totals.profit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending Sale">Pending Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Container ID</TableHead>
                <TableHead>Ship Date</TableHead>
                <TableHead>Arrival</TableHead>
                <TableHead className="text-center">Cars</TableHead>
                <TableHead className="text-right">Purchase Cost</TableHead>
                <TableHead className="text-right">Shipping</TableHead>
                <TableHead className="text-right">Customs</TableHead>
                <TableHead className="text-right">Other</TableHead>
                <TableHead className="text-right">Total Sales</TableHead>
                <TableHead className="text-right">Unsold Value</TableHead>
                <TableHead className="text-right">Profit/Loss</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.shipDate}</TableCell>
                  <TableCell>{item.arrivalDate}</TableCell>
                  <TableCell className="text-center">{item.totalCars}</TableCell>
                  <TableCell className="text-right">
                    ${item.purchaseCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.shippingCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.customsDuty.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.otherExpenses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.totalSales.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.unsoldValue.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      item.profit >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {item.profit >= 0 ? "+" : ""}${item.profit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Completed"
                          ? "bg-success/10 text-success border-success/20"
                          : item.status === "In Progress"
                          ? "bg-info/10 text-info border-info/20"
                          : "bg-warning/10 text-warning border-warning/20"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell>TOTAL</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-center">{totals.totalCars}</TableCell>
                <TableCell className="text-right">
                  ${totals.purchaseCost.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.shippingCost.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.customsDuty.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.otherExpenses.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.totalSales.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.unsoldValue.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    totals.profit >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {totals.profit >= 0 ? "+" : ""}${totals.profit.toLocaleString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Cost Breakdown */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Purchase Cost</span>
                <span className="font-medium">
                  ${totals.purchaseCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping Cost</span>
                <span className="font-medium">
                  ${totals.shippingCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Customs Duty</span>
                <span className="font-medium">
                  ${totals.customsDuty.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Other Expenses</span>
                <span className="font-medium">
                  ${totals.otherExpenses.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="font-semibold">Total Cost</span>
                <span className="font-bold text-lg">
                  $
                  {(
                    totals.purchaseCost +
                    totals.shippingCost +
                    totals.customsDuty +
                    totals.otherExpenses
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Revenue Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Sales</span>
                <span className="font-medium text-success">
                  ${totals.totalSales.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Unsold Inventory Value</span>
                <span className="font-medium text-info">
                  ${totals.unsoldValue.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="font-semibold">Total Revenue (Actual + Projected)</span>
                <span className="font-bold text-lg">
                  ${(totals.totalSales + totals.unsoldValue).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4 p-3 rounded-lg bg-muted/50">
                <span className="font-semibold">Net Profit/Loss</span>
                <span
                  className={`font-bold text-xl ${
                    totals.profit >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {totals.profit >= 0 ? "+" : ""}${totals.profit.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContainerProfitLossReport;
