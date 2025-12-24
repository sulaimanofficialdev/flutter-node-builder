import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Container,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  {
    id: 1,
    title: "Container Profit/Loss Report",
    description: "Detailed analysis of profit or loss per container including unsold inventory valuation",
    icon: Container,
    type: "Financial",
    lastGenerated: "Dec 20, 2024",
    frequency: "Weekly",
    route: "/reports/container-profit-loss",
  },
  {
    id: 2,
    title: "Monthly Sales Report",
    description: "Complete breakdown of all sales, including auctions and direct sales",
    icon: TrendingUp,
    type: "Sales",
    lastGenerated: "Dec 15, 2024",
    frequency: "Monthly",
    route: "/reports/monthly-sales",
  },
  {
    id: 3,
    title: "Inventory Valuation Report",
    description: "Current value of all inventory across Japan and Dubai locations",
    icon: BarChart3,
    type: "Inventory",
    lastGenerated: "Dec 18, 2024",
    frequency: "Weekly",
    route: "/reports/inventory-valuation",
  },
  {
    id: 4,
    title: "Employee Expense Report",
    description: "Salary and expense tracking for all employees by region",
    icon: FileSpreadsheet,
    type: "HR",
    lastGenerated: "Dec 19, 2024",
    frequency: "Monthly",
    route: "/reports/employee-expense",
  },
  {
    id: 5,
    title: "Property Income Report",
    description: "Rental income and expenses for all company properties",
    icon: PieChart,
    type: "Property",
    lastGenerated: "Dec 17, 2024",
    frequency: "Monthly",
    route: "/reports/property-income",
  },
  {
    id: 6,
    title: "Financial Summary Report",
    description: "Complete financial snapshot including cash, bank, receivables, and payables",
    icon: FileText,
    type: "Financial",
    lastGenerated: "Dec 20, 2024",
    frequency: "Daily",
    route: "/reports/financial-summary",
  },
];

const typeColors = {
  Financial: "bg-primary/10 text-primary border-primary/20",
  Sales: "bg-success/10 text-success border-success/20",
  Inventory: "bg-info/10 text-info border-info/20",
  HR: "bg-warning/10 text-warning border-warning/20",
  Property: "bg-accent/10 text-accent border-accent/20",
};

const Reports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and download business reports
            </p>
          </div>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Custom Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Profit (MTD)</p>
                <p className="text-xl font-bold text-success">+$89,200</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Container className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Containers Processed</p>
                <p className="text-xl font-bold text-foreground">12</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Container Profit</p>
                <p className="text-xl font-bold text-foreground">$7,433</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="text-xl font-bold text-foreground">48</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge
                  variant="outline"
                  className={cn("font-medium", typeColors[report.type as keyof typeof typeColors])}
                >
                  {report.type}
                </Badge>
              </div>

              <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{report.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Generated</span>
                  <span className="text-foreground">{report.lastGenerated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Frequency</span>
                  <span className="text-foreground">{report.frequency}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1">
                  View
                </Button>
                <Button size="sm" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
