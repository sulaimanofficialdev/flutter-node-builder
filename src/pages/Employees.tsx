import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, MapPin, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  {
    id: 1,
    name: "Kenji Tanaka",
    role: "Warehouse Manager",
    region: "japan",
    department: "Operations",
    email: "kenji.t@autoparts.jp",
    phone: "+81 90 1234 5678",
    salary: 5500,
    status: "active",
  },
  {
    id: 2,
    name: "Ahmed Al-Rashid",
    role: "Sales Director",
    region: "dubai",
    department: "Sales",
    email: "ahmed.r@autoparts.ae",
    phone: "+971 50 123 4567",
    salary: 8500,
    status: "active",
  },
  {
    id: 3,
    name: "Yuki Yamamoto",
    role: "Dismantling Specialist",
    region: "japan",
    department: "Workshop",
    email: "yuki.y@autoparts.jp",
    phone: "+81 80 2345 6789",
    salary: 4200,
    status: "active",
  },
  {
    id: 4,
    name: "Mohammed Hassan",
    role: "Auction Manager",
    region: "dubai",
    department: "Sales",
    email: "mohammed.h@autoparts.ae",
    phone: "+971 55 234 5678",
    salary: 6800,
    status: "active",
  },
  {
    id: 5,
    name: "Sakura Ito",
    role: "Logistics Coordinator",
    region: "japan",
    department: "Shipping",
    email: "sakura.i@autoparts.jp",
    phone: "+81 70 3456 7890",
    salary: 4800,
    status: "active",
  },
  {
    id: 6,
    name: "Fatima Al-Sayed",
    role: "Finance Manager",
    region: "dubai",
    department: "Finance",
    email: "fatima.s@autoparts.ae",
    phone: "+971 52 345 6789",
    salary: 7200,
    status: "active",
  },
];

const Employees = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground mt-1">
              Manage staff across Japan and Dubai operations
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-10" />
          </div>
          <div className="flex gap-1 p-1 bg-secondary rounded-lg">
            <Button variant="default" size="sm">All</Button>
            <Button variant="ghost" size="sm">Japan</Button>
            <Button variant="ghost" size="sm">Dubai</Button>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee, index) => (
            <div
              key={employee.id}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
              </div>

              {/* Region Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "font-medium",
                    employee.region === "japan"
                      ? "bg-info/10 text-info border-info/20"
                      : "bg-warning/10 text-warning border-warning/20"
                  )}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {employee.region === "japan" ? "Japan" : "Dubai"}
                </Badge>
                <Badge variant="outline" className="font-medium bg-secondary text-foreground border-border">
                  {employee.department}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
              </div>

              {/* Salary */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Monthly Salary</span>
                <span className="text-xl font-bold text-primary">${employee.salary.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;
