import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { ContainerStatus } from "@/components/dashboard/ContainerStatus";
import { Car, Container, Package, ShoppingCart, Users, Building2 } from "lucide-react";

const stats = [
  {
    title: "Total Vehicles",
    value: "156",
    change: "+12",
    changeType: "positive" as const,
    icon: Car,
  },
  {
    title: "Active Containers",
    value: "8",
    change: "+2",
    changeType: "positive" as const,
    icon: Container,
  },
  {
    title: "Inventory Parts",
    value: "12,450",
    change: "+890",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "Pending Orders",
    value: "34",
    change: "-5",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "Employees",
    value: "28",
    change: "0",
    changeType: "neutral" as const,
    icon: Users,
  },
  {
    title: "Properties",
    value: "4",
    change: "+1",
    changeType: "positive" as const,
    icon: Building2,
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your business operations.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 100} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Container Status - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ContainerStatus />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Financial Overview - Full Width */}
        <FinancialOverview />
      </div>
    </MainLayout>
  );
};

export default Index;
