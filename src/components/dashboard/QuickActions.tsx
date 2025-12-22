import { Plus, FileText, Truck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Plus,
    label: "Add Vehicle",
    description: "Register new purchase",
    variant: "default" as const,
  },
  {
    icon: FileText,
    label: "Create Order",
    description: "New sales order",
    variant: "secondary" as const,
  },
  {
    icon: Truck,
    label: "New Container",
    description: "Start loading",
    variant: "secondary" as const,
  },
  {
    icon: DollarSign,
    label: "Record Payment",
    description: "Log transaction",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="h-auto flex-col py-4 px-3 gap-2 animate-scale-in"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center">
              <action.icon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="text-xs opacity-70">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
