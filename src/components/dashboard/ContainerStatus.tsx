import { Container, Ship, Anchor, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const containers = [
  {
    id: "CT-2024-089",
    status: "in_transit",
    origin: "Tokyo, Japan",
    destination: "Dubai, UAE",
    progress: 65,
    eta: "Dec 28, 2024",
    items: 234,
  },
  {
    id: "CT-2024-088",
    status: "loading",
    origin: "Osaka, Japan",
    destination: "Dubai, UAE",
    progress: 40,
    eta: "Jan 5, 2025",
    items: 156,
  },
  {
    id: "CT-2024-087",
    status: "arrived",
    origin: "Yokohama, Japan",
    destination: "Dubai, UAE",
    progress: 100,
    eta: "Arrived",
    items: 312,
  },
];

const statusConfig = {
  loading: {
    icon: Container,
    label: "Loading",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  in_transit: {
    icon: Ship,
    label: "In Transit",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  arrived: {
    icon: CheckCircle,
    label: "Arrived",
    color: "text-success",
    bgColor: "bg-success/10",
  },
};

export function ContainerStatus() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Container Tracking</h3>
          <p className="text-sm text-muted-foreground">Active shipments from Japan</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all →
        </button>
      </div>
      <div className="divide-y divide-border">
        {containers.map((container, index) => {
          const config = statusConfig[container.status as keyof typeof statusConfig];
          return (
            <div
              key={container.id}
              className="p-4 hover:bg-secondary/30 transition-colors animate-slide-in-left"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bgColor)}>
                    <config.icon className={cn("w-5 h-5", config.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{container.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {container.origin} → {container.destination}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn("text-xs font-medium px-2 py-1 rounded-full", config.bgColor, config.color)}>
                    {config.label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{container.items} items</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{container.progress}%</span>
                </div>
                <Progress value={container.progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">ETA: {container.eta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
