import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Landmark,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const summaryData = [
  { label: "Total Sales", value: 284500, icon: TrendingUp, color: "text-success", bgColor: "bg-success/10" },
  { label: "Cash in Locker", value: 45200, icon: Wallet, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Bank Balance", value: 128900, icon: Landmark, color: "text-info", bgColor: "bg-info/10" },
  { label: "Receivables", value: 67300, icon: CreditCard, color: "text-warning", bgColor: "bg-warning/10" },
  { label: "Payables", value: 23400, icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  { label: "Net Profit", value: 89200, icon: DollarSign, color: "text-success", bgColor: "bg-success/10" },
];

const transactions = [
  { id: "TXN-001", type: "income", description: "Order #ORD-001 Payment", amount: 15600, date: "2024-12-20", category: "Sales" },
  { id: "TXN-002", type: "expense", description: "Employee Salaries - December", amount: 28500, date: "2024-12-19", category: "Salaries" },
  { id: "TXN-003", type: "income", description: "Rental Income - Property 1", amount: 3500, date: "2024-12-18", category: "Rental" },
  { id: "TXN-004", type: "expense", description: "Warehouse Rent - Jebel Ali", amount: 4500, date: "2024-12-17", category: "Rent" },
  { id: "TXN-005", type: "income", description: "Auction Sales - AUC-003", amount: 45200, date: "2024-12-15", category: "Auction" },
  { id: "TXN-006", type: "expense", description: "Container Shipping CT-2024-089", amount: 8900, date: "2024-12-14", category: "Shipping" },
];

const expenses = [
  { category: "Salaries", amount: 28500, percentage: 45 },
  { category: "Rent", amount: 7000, percentage: 11 },
  { category: "Shipping", amount: 12500, percentage: 20 },
  { category: "Utilities", amount: 3200, percentage: 5 },
  { category: "Transportation", amount: 4800, percentage: 8 },
  { category: "Other", amount: 7000, percentage: 11 },
];

const Finance = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finance</h1>
            <p className="text-muted-foreground mt-1">
              Track all financial activities and generate reports
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {summaryData.map((item, index) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all animate-scale-in"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.bgColor)}>
                  <item.icon className={cn("w-4 h-4", item.color)} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className={cn("text-xl font-bold", item.color)}>${item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <TabsList className="bg-secondary">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
            <TabsTrigger value="receivables">Receivables</TabsTrigger>
            <TabsTrigger value="payables">Payables</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn, index) => (
                    <TableRow
                      key={txn.id}
                      className="animate-slide-in-left"
                      style={{ animationDelay: `${400 + index * 50}ms` }}
                    >
                      <TableCell className="font-medium text-foreground">{txn.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium",
                            txn.type === "income"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {txn.type === "income" ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {txn.type}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary text-foreground border-border">
                          {txn.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-semibold",
                          txn.type === "income" ? "text-success" : "text-destructive"
                        )}
                      >
                        {txn.type === "income" ? "+" : "-"}${txn.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Expense Breakdown</h3>
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div
                    key={expense.category}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${400 + index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{expense.category}</span>
                      <span className="text-sm font-semibold text-foreground">${expense.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{expense.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Receivables Tab */}
          <TabsContent value="receivables">
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <CreditCard className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Receivables Management</h3>
              <p className="text-muted-foreground mb-4">Track pending payments from customers</p>
              <Button>View All Receivables</Button>
            </div>
          </TabsContent>

          {/* Payables Tab */}
          <TabsContent value="payables">
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Payables Management</h3>
              <p className="text-muted-foreground mb-4">Manage outstanding payments and liabilities</p>
              <Button>View All Payables</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Finance;
