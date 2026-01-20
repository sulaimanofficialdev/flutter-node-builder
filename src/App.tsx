import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
            <Route path="/containers" element={<ProtectedRoute><Containers /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/reports/container-profit-loss" element={<ProtectedRoute><ContainerProfitLossReport /></ProtectedRoute>} />
            <Route path="/reports/monthly-sales" element={<ProtectedRoute><MonthlySalesReport /></ProtectedRoute>} />
            <Route path="/reports/inventory-valuation" element={<ProtectedRoute><InventoryValuationReport /></ProtectedRoute>} />
            <Route path="/reports/employee-expense" element={<ProtectedRoute><EmployeeExpenseReport /></ProtectedRoute>} />
            <Route path="/reports/property-income" element={<ProtectedRoute><PropertyIncomeReport /></ProtectedRoute>} />
            <Route path="/reports/financial-summary" element={<ProtectedRoute><FinancialSummaryReport /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
