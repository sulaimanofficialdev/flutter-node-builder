import { Car, Container, ShoppingCart, Package, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    icon: Car,
    title: "New vehicle purchased",
    description: "Toyota Camry 2019 from Tokyo Auction",
    time: "2 hours ago",
    type: "purchase",
  },
  {
    id: 2,
    icon: Container,
    title: "Container shipped",
    description: "Container #CT-2024-089 departed for Dubai",
    time: "5 hours ago",
    type: "shipping",
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "Order completed",
    description: "Engine parts sold to Al Rashid Motors",
    time: "1 day ago",
    type: "sale",
  },
  {
    id: 4,
    icon: Package,
    title: "Inventory updated",
    description: "450 parts added to Dubai warehouse",
    time: "2 days ago",
    type: "inventory",
  },
  {
    id: 5,
    icon: Wallet,
    title: "Payment received",
    description: "$12,500 from Gulf Auto Parts",
    time: "3 days ago",
    type: "payment",
  },
];

const typeColors = {
  purchase: "bg-info/20 text-info",
  shipping: "bg-warning/20 text-warning",
  sale: "bg-success/20 text-success",
  inventory: "bg-primary/20 text-primary",
  payment: "bg-accent/20 text-accent",
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates across all operations</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-secondary/50 transition-colors animate-slide-in-left"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  typeColors[activity.type as keyof typeof typeColors]
                )}
              >
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all activity →
        </button>
      </div>
    </div>
  );
}
