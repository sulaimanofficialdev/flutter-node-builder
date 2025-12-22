import { TrendingUp, TrendingDown, DollarSign, CreditCard, Landmark, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const financialData = [
  {
    label: "Total Sales",
    value: "$284,500",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Cash in Locker",
    value: "$45,200",
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Bank Balance",
    value: "$128,900",
    icon: Landmark,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Receivables",
    value: "$67,300",
    icon: CreditCard,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Payables",
    value: "$23,400",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    label: "Net Profit",
    value: "$89,200",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export function FinancialOverview() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Financial Summary</h3>
          <p className="text-sm text-muted-foreground">Current month overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-success font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +12.5%
          </span>
          <span className="text-muted-foreground">this month</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {financialData.map((item, index) => (
          <div
            key={item.label}
            className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-scale-in"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.bgColor)}>
                <item.icon className={cn("w-4 h-4", item.color)} />
              </div>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <p className={cn("text-xl font-bold", item.color)}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
