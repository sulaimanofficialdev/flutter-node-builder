import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  Container,
  Package,
  ShoppingCart,
  Users,
  Building2,
  Wallet,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Settings,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  region?: "japan" | "dubai" | "both";
}

const navigation: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", region: "both" },
  { icon: Car, label: "Vehicles", href: "/vehicles", region: "japan" },
  { icon: Container, label: "Containers", href: "/containers", region: "both" },
  { icon: Package, label: "Inventory", href: "/inventory", region: "both" },
  { icon: ShoppingCart, label: "Sales & Orders", href: "/sales", region: "dubai" },
  { icon: Users, label: "Employees", href: "/employees", region: "both" },
  { icon: Building2, label: "Properties", href: "/properties", region: "dubai" },
  { icon: Wallet, label: "Finance", href: "/finance", region: "both" },
  { icon: BarChart3, label: "Reports", href: "/reports", region: "both" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeRegion, setActiveRegion] = useState<"japan" | "dubai" | "both">("both");
  const location = useLocation();

  const filteredNav = navigation.filter(
    (item) => item.region === "both" || item.region === activeRegion || activeRegion === "both"
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
      style={{ background: "var(--gradient-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">AutoParts Pro</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center mx-auto">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Region Selector */}
      <div className={cn("p-4 border-b border-sidebar-border", collapsed && "px-2")}>
        {!collapsed ? (
          <div className="flex gap-1 p-1 bg-secondary rounded-lg">
            {(["japan", "dubai", "both"] as const).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={cn(
                  "flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all",
                  activeRegion === region
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {region === "both" ? "All" : region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {(["japan", "dubai", "both"] as const).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={cn(
                  "w-full py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center",
                  activeRegion === region
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-secondary"
                )}
                title={region.charAt(0).toUpperCase() + region.slice(1)}
              >
                <MapPin className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "group relative overflow-hidden",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
              )}
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {item.region !== "both" && !collapsed && (
                <span
                  className={cn(
                    "ml-auto text-[10px] px-1.5 py-0.5 rounded font-medium",
                    item.region === "japan"
                      ? "bg-info/20 text-info"
                      : "bg-warning/20 text-warning"
                  )}
                >
                  {item.region === "japan" ? "JP" : "DXB"}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings & Collapse */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
            "text-muted-foreground hover:bg-secondary hover:text-foreground",
            location.pathname === "/settings" && "bg-primary/10 text-primary"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
