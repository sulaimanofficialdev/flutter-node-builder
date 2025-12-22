import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Container, Ship, CheckCircle, Package, Camera, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const containers = [
  {
    id: "CT-2024-089",
    status: "in_transit",
    origin: "Tokyo, Japan",
    destination: "Dubai, UAE",
    progress: 65,
    eta: "Dec 28, 2024",
    items: 234,
    loadingSteps: 5,
    value: 125000,
  },
  {
    id: "CT-2024-088",
    status: "loading",
    origin: "Osaka, Japan",
    destination: "Dubai, UAE",
    progress: 40,
    eta: "Jan 5, 2025",
    items: 156,
    loadingSteps: 3,
    value: 89000,
  },
  {
    id: "CT-2024-087",
    status: "arrived",
    origin: "Yokohama, Japan",
    destination: "Dubai, UAE",
    progress: 100,
    eta: "Arrived Dec 18",
    items: 312,
    loadingSteps: 6,
    value: 178000,
  },
  {
    id: "CT-2024-086",
    status: "unloading",
    origin: "Tokyo, Japan",
    destination: "Dubai, UAE",
    progress: 100,
    eta: "Arrived Dec 15",
    items: 289,
    loadingSteps: 5,
    value: 156000,
  },
];

const statusConfig = {
  loading: {
    icon: Package,
    label: "Loading",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
  },
  in_transit: {
    icon: Ship,
    label: "In Transit",
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/20",
  },
  arrived: {
    icon: CheckCircle,
    label: "Arrived",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  unloading: {
    icon: Container,
    label: "Unloading",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
};

const Containers = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Containers</h1>
            <p className="text-muted-foreground mt-1">
              Track shipments between Japan and Dubai
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Container
          </Button>
        </div>

        {/* Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {containers.map((container, index) => {
            const config = statusConfig[container.status as keyof typeof statusConfig];
            return (
              <div
                key={container.id}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", config.bgColor)}>
                        <config.icon className={cn("w-7 h-7", config.color)} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{container.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {container.origin} → {container.destination}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("font-medium", config.bgColor, config.color, config.borderColor)}
                    >
                      {config.label}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipment Progress</span>
                      <span className="font-medium text-foreground">{container.progress}%</span>
                    </div>
                    <Progress value={container.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{container.eta}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">{container.items}</p>
                      <p className="text-xs text-muted-foreground">Items</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">{container.loadingSteps}</p>
                      <p className="text-xs text-muted-foreground">Load Steps</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <p className="text-2xl font-bold text-primary">${(container.value / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-muted-foreground">Value</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="secondary" size="sm" className="flex-1 gap-2">
                      <Camera className="w-4 h-4" />
                      Photos
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1 gap-2">
                      <FileText className="w-4 h-4" />
                      Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Containers;
