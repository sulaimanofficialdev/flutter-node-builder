import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Package, Grid3X3, List } from "lucide-react";
import { AddInventoryForm } from "@/components/forms";
import { cn } from "@/lib/utils";
import { useState } from "react";

const inventoryItems = [
  {
    id: "INV-001",
    name: "Engine Block - Toyota 2.5L",
    category: "Engine Parts",
    quantity: 12,
    location: "Dubai Warehouse A",
    price: 1250,
    condition: "excellent",
    source: "CT-2024-087",
  },
  {
    id: "INV-002",
    name: "Transmission Assembly - Honda CVT",
    category: "Transmission",
    quantity: 8,
    location: "Dubai Warehouse A",
    price: 980,
    condition: "good",
    source: "CT-2024-087",
  },
  {
    id: "INV-003",
    name: "Front Bumper - BMW 3 Series",
    category: "Body Parts",
    quantity: 15,
    location: "Dubai Warehouse B",
    price: 320,
    condition: "excellent",
    source: "CT-2024-086",
  },
  {
    id: "INV-004",
    name: "Headlight Assembly - Mercedes",
    category: "Electrical",
    quantity: 24,
    location: "Dubai Warehouse A",
    price: 450,
    condition: "excellent",
    source: "CT-2024-086",
  },
  {
    id: "INV-005",
    name: "Alternator - Nissan 2.0L",
    category: "Electrical",
    quantity: 18,
    location: "Japan Warehouse",
    price: 185,
    condition: "good",
    source: "VH-003",
  },
  {
    id: "INV-006",
    name: "Door Panel - Toyota Camry",
    category: "Body Parts",
    quantity: 30,
    location: "Dubai Warehouse B",
    price: 120,
    condition: "fair",
    source: "CT-2024-085",
  },
];

const conditionConfig = {
  excellent: { label: "Excellent", className: "bg-success/10 text-success border-success/20" },
  good: { label: "Good", className: "bg-info/10 text-info border-info/20" },
  fair: { label: "Fair", className: "bg-warning/10 text-warning border-warning/20" },
};

const Inventory = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
            <p className="text-muted-foreground mt-1">
              Manage spare parts across all locations
            </p>
          </div>
          <AddInventoryForm />
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search inventory..." className="pl-10" />
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className={cn(
          "grid gap-4",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {inventoryItems.map((item, index) => {
            const condition = conditionConfig[item.condition as keyof typeof conditionConfig];
            return (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.id}</p>
                      <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("font-medium", condition.className)}>
                    {condition.label}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-semibold text-foreground">{item.quantity} units</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Source</span>
                    <span className="text-info">{item.source}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-2xl font-bold text-primary">${item.price}</p>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Inventory;
