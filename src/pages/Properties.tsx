import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, MapPin, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { AddPropertyForm } from "@/components/forms";
import { cn } from "@/lib/utils";

const properties = [
  {
    id: 1,
    name: "Dubai Warehouse A",
    type: "warehouse",
    address: "Al Quoz Industrial Area 3, Dubai",
    size: "5,000 sqft",
    status: "owned",
    monthlyIncome: 0,
    monthlyExpense: 2500,
    value: 850000,
  },
  {
    id: 2,
    name: "Dubai Warehouse B",
    type: "warehouse",
    address: "Jebel Ali Free Zone, Dubai",
    size: "8,000 sqft",
    status: "rented",
    monthlyIncome: 0,
    monthlyExpense: 4500,
    value: 0,
  },
  {
    id: 3,
    name: "Staff Accommodation",
    type: "residential",
    address: "Discovery Gardens, Dubai",
    size: "2,500 sqft",
    status: "owned",
    monthlyIncome: 0,
    monthlyExpense: 800,
    value: 420000,
  },
  {
    id: 4,
    name: "Rental Property 1",
    type: "commercial",
    address: "Deira, Dubai",
    size: "1,200 sqft",
    status: "owned",
    monthlyIncome: 3500,
    monthlyExpense: 200,
    value: 380000,
  },
];

const typeConfig = {
  warehouse: { icon: Building2, label: "Warehouse", color: "text-info", bgColor: "bg-info/10" },
  residential: { icon: Home, label: "Residential", color: "text-success", bgColor: "bg-success/10" },
  commercial: { icon: Building2, label: "Commercial", color: "text-warning", bgColor: "bg-warning/10" },
};

const Properties = () => {
  const totalIncome = properties.reduce((sum, p) => sum + p.monthlyIncome, 0);
  const totalExpense = properties.reduce((sum, p) => sum + p.monthlyExpense, 0);
  const totalValue = properties.reduce((sum, p) => sum + p.value, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Properties</h1>
            <p className="text-muted-foreground mt-1">
              Manage company properties and rental income
            </p>
          </div>
          <AddPropertyForm />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Properties</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{properties.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Monthly Income</span>
            </div>
            <p className="text-2xl font-bold text-success">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Monthly Expense</span>
            </div>
            <p className="text-2xl font-bold text-destructive">${totalExpense.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-primary">${(totalValue / 1000000).toFixed(2)}M</p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property, index) => {
            const config = typeConfig[property.type as keyof typeof typeConfig];
            const netFlow = property.monthlyIncome - property.monthlyExpense;
            return (
              <div
                key={property.id}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", config.bgColor)}>
                        <config.icon className={cn("w-7 h-7", config.color)} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{property.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{property.address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="outline"
                        className={cn("font-medium", config.bgColor, config.color)}
                      >
                        {config.label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          property.status === "owned"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        )}
                      >
                        {property.status === "owned" ? "Owned" : "Rented"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-secondary/50">
                      <p className="text-lg font-bold text-foreground">{property.size}</p>
                      <p className="text-xs text-muted-foreground">Size</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-success/10">
                      <p className="text-lg font-bold text-success">${property.monthlyIncome}</p>
                      <p className="text-xs text-muted-foreground">Income/mo</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-destructive/10">
                      <p className="text-lg font-bold text-destructive">${property.monthlyExpense}</p>
                      <p className="text-xs text-muted-foreground">Expense/mo</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Monthly Flow</p>
                      <p className={cn("text-xl font-bold", netFlow >= 0 ? "text-success" : "text-destructive")}>
                        {netFlow >= 0 ? "+" : ""} ${netFlow.toLocaleString()}
                      </p>
                    </div>
                    {property.value > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Property Value</p>
                        <p className="text-xl font-bold text-primary">${property.value.toLocaleString()}</p>
                      </div>
                    )}
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

export default Properties;
