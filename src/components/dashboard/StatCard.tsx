import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              <span>{change}</span>
              <span className="text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
            "bg-primary/10"
          )}
        >
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
