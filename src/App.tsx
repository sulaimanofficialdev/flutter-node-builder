import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Containers from "./pages/Containers";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Employees from "./pages/Employees";
import Properties from "./pages/Properties";
import Finance from "./pages/Finance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import {
  ContainerProfitLossReport,
  MonthlySalesReport,
  InventoryValuationReport,
  EmployeeExpenseReport,
  PropertyIncomeReport,
  FinancialSummaryReport,
} from "./pages/reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/container-profit-loss" element={<ContainerProfitLossReport />} />
          <Route path="/reports/monthly-sales" element={<MonthlySalesReport />} />
          <Route path="/reports/inventory-valuation" element={<InventoryValuationReport />} />
          <Route path="/reports/employee-expense" element={<EmployeeExpenseReport />} />
          <Route path="/reports/property-income" element={<PropertyIncomeReport />} />
          <Route path="/reports/financial-summary" element={<FinancialSummaryReport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
