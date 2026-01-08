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
  Wallet,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Printer,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ReportTableActions, DetailField } from "@/components/reports";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const cashFlowData = [
  { date: "Dec 1", inflow: 12500, outflow: 8200, balance: 45300 },
  { date: "Dec 5", inflow: 18200, outflow: 15600, balance: 47900 },
  { date: "Dec 10", inflow: 9800, outflow: 6400, balance: 51300 },
  { date: "Dec 15", inflow: 22000, outflow: 18500, balance: 54800 },
  { date: "Dec 20", inflow: 15600, outflow: 12200, balance: 58200 },
  { date: "Dec 24", inflow: 8400, outflow: 5100, balance: 61500 },
];

const recentTransactions = [
  {
    id: "TXN-001",
    date: "2024-12-24",
    description: "Container Sale - CNT-2024-003",
    type: "Income",
    amount: 18500,
    category: "Sales",
  },
  {
    id: "TXN-002",
    date: "2024-12-23",
    description: "Staff Salary - December",
    type: "Expense",
    amount: 45680,
    category: "Payroll",
  },
  {
    id: "TXN-003",
    date: "2024-12-22",
    description: "Deira Shop Rent Received",
    type: "Income",
    amount: 8500,
    category: "Rental",
  },
  {
    id: "TXN-004",
    date: "2024-12-21",
    description: "Vehicle Purchase - Auction",
    type: "Expense",
    amount: 12400,
    category: "Procurement",
  },
  {
    id: "TXN-005",
    date: "2024-12-20",
    description: "Direct Sale - Engine Parts",
    type: "Income",
    amount: 6200,
    category: "Sales",
  },
  {
    id: "TXN-006",
    date: "2024-12-19",
    description: "Shipping Cost - Container",
    type: "Expense",
    amount: 8500,
    category: "Logistics",
  },
  {
    id: "TXN-007",
    date: "2024-12-18",
    description: "Utility Bills - All Properties",
    type: "Expense",
    amount: 2850,
    category: "Utilities",
  },
  {
    id: "TXN-008",
    date: "2024-12-17",
    description: "Auction Sale - Mixed Parts",
    type: "Income",
    amount: 14200,
    category: "Sales",
  },
];

const receivables = [
  { customer: "Mohammed Trading", amount: 12500, dueDate: "2024-12-30", status: "Current" },
  { customer: "Emirates Spare Parts", amount: 8200, dueDate: "2024-12-28", status: "Current" },
  { customer: "Al Futtaim Motors", amount: 5600, dueDate: "2024-12-20", status: "Overdue" },
  { customer: "Sharjah Auto Market", amount: 3400, dueDate: "2025-01-05", status: "Current" },
];

const payables = [
  { vendor: "Japan Auction House", amount: 18500, dueDate: "2024-12-28", status: "Current" },
  { vendor: "Shipping Line Co.", amount: 8500, dueDate: "2024-12-30", status: "Current" },
  { vendor: "Customs Authority", amount: 4200, dueDate: "2024-12-25", status: "Due Soon" },
];

const chartConfig = {
  inflow: { label: "Cash In", color: "hsl(var(--success))" },
  outflow: { label: "Cash Out", color: "hsl(var(--destructive))" },
  balance: { label: "Balance", color: "hsl(var(--primary))" },
};

const FinancialSummaryReport = () => {
  const navigate = useNavigate();

  const totalReceivables = receivables.reduce((acc, r) => acc + r.amount, 0);
  const totalPayables = payables.reduce((acc, p) => acc + p.amount, 0);

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
                Financial Summary Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Complete financial snapshot including cash, bank, receivables, and
                payables
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

        {/* Financial Overview Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash in Locker</p>
                <p className="text-xl font-bold text-success">$24,500</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bank Balance</p>
                <p className="text-xl font-bold text-primary">$142,800</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receivables</p>
                <p className="text-xl font-bold text-info">
                  ${totalReceivables.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payables</p>
                <p className="text-xl font-bold text-warning">
                  ${totalPayables.toLocaleString()}
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
                <p className="text-sm text-muted-foreground">Net Position</p>
                <p className="text-xl font-bold text-success">
                  +$
                  {(
                    24500 +
                    142800 +
                    totalReceivables -
                    totalPayables
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Chart */}
        <div
          className="rounded-xl border border-border bg-card p-6 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Cash Flow - December 2024
            </h3>
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              Last 30 Days
            </Badge>
          </div>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={cashFlowData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Receivables & Payables */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          {/* Receivables */}
          <div className="rounded-xl border border-border bg-card">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Accounts Receivable
              </h3>
              <span className="text-success font-semibold">
                ${totalReceivables.toLocaleString()}
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivables.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.customer}</TableCell>
                    <TableCell className="text-right">
                      ${r.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{r.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          r.status === "Overdue"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-success/10 text-success border-success/20"
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Payables */}
          <div className="rounded-xl border border-border bg-card">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Accounts Payable
              </h3>
              <span className="text-warning font-semibold">
                ${totalPayables.toLocaleString()}
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payables.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{p.vendor}</TableCell>
                    <TableCell className="text-right">
                      ${p.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{p.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          p.status === "Due Soon"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-success/10 text-success border-success/20"
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Transactions
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{txn.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        txn.type === "Income"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      txn.type === "Income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {txn.type === "Income" ? "+" : "-"}$
                    {txn.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <ReportTableActions
                      itemId={txn.id}
                      itemName={txn.description}
                      onViewDetail={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      detailContent={
                        <div className="grid grid-cols-2 gap-4">
                          <DetailField label="Transaction ID" value={txn.id} />
                          <DetailField label="Date" value={txn.date} />
                          <DetailField label="Description" value={txn.description} />
                          <DetailField label="Category" value={txn.category} />
                          <DetailField label="Type" value={txn.type} />
                          <DetailField label="Amount" value={`${txn.type === "Income" ? "+" : "-"}$${txn.amount.toLocaleString()}`} />
                        </div>
                      }
                      editContent={
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" defaultValue={txn.date} />
                          </div>
                          <div className="space-y-2">
                            <Label>Amount</Label>
                            <Input type="number" defaultValue={txn.amount} />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>Description</Label>
                            <Input defaultValue={txn.description} />
                          </div>
                        </div>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Box */}
        <div
          className="rounded-xl border border-primary/50 bg-primary/5 p-6 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Financial Health Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Liquid Assets</p>
              <p className="text-2xl font-bold text-success">$167,300</p>
              <p className="text-xs text-muted-foreground">Cash + Bank</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Working Capital</p>
              <p className="text-2xl font-bold text-primary">
                ${(totalReceivables - totalPayables).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Receivables - Payables</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Profit (MTD)</p>
              <p className="text-2xl font-bold text-success">+$89,200</p>
              <p className="text-xs text-muted-foreground">Dec 2024</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancialSummaryReport;
