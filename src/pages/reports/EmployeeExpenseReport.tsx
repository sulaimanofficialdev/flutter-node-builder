import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Download,
  Users,
  DollarSign,
  MapPin,
  Briefcase,
  Printer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ReportTableActions, DetailField } from "@/components/reports";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const employeeData = [
  {
    id: "EMP-001",
    name: "Takeshi Yamamoto",
    role: "Operations Manager",
    region: "Japan",
    department: "Operations",
    salary: 5500,
    allowances: 800,
    bonus: 1200,
    deductions: 650,
    netPay: 6850,
  },
  {
    id: "EMP-002",
    name: "Ahmed Hassan",
    role: "Sales Manager",
    region: "Dubai",
    department: "Sales",
    salary: 6000,
    allowances: 1000,
    bonus: 1500,
    deductions: 750,
    netPay: 7750,
  },
  {
    id: "EMP-003",
    name: "Yuki Tanaka",
    role: "Dismantling Lead",
    region: "Japan",
    department: "Operations",
    salary: 4200,
    allowances: 500,
    bonus: 600,
    deductions: 480,
    netPay: 4820,
  },
  {
    id: "EMP-004",
    name: "Omar Al-Farsi",
    role: "Auction Specialist",
    region: "Dubai",
    department: "Sales",
    salary: 4800,
    allowances: 600,
    bonus: 800,
    deductions: 540,
    netPay: 5660,
  },
  {
    id: "EMP-005",
    name: "Kenji Sato",
    role: "Shipping Coordinator",
    region: "Japan",
    department: "Logistics",
    salary: 4000,
    allowances: 400,
    bonus: 500,
    deductions: 420,
    netPay: 4480,
  },
  {
    id: "EMP-006",
    name: "Fatima Al-Rashid",
    role: "Accountant",
    region: "Dubai",
    department: "Finance",
    salary: 5200,
    allowances: 700,
    bonus: 900,
    deductions: 600,
    netPay: 6200,
  },
  {
    id: "EMP-007",
    name: "Hiroshi Nakamura",
    role: "Quality Inspector",
    region: "Japan",
    department: "Operations",
    salary: 3800,
    allowances: 350,
    bonus: 400,
    deductions: 380,
    netPay: 4170,
  },
  {
    id: "EMP-008",
    name: "Khalid Bin Rashid",
    role: "Warehouse Manager",
    region: "Dubai",
    department: "Logistics",
    salary: 5000,
    allowances: 600,
    bonus: 700,
    deductions: 550,
    netPay: 5750,
  },
];

const departmentData = [
  { name: "Operations", value: 15840, color: "hsl(var(--primary))" },
  { name: "Sales", value: 13410, color: "hsl(var(--success))" },
  { name: "Logistics", value: 10230, color: "hsl(var(--info))" },
  { name: "Finance", value: 6200, color: "hsl(var(--warning))" },
];

const chartConfig = {
  Operations: { label: "Operations", color: "hsl(var(--primary))" },
  Sales: { label: "Sales", color: "hsl(var(--success))" },
  Logistics: { label: "Logistics", color: "hsl(var(--info))" },
  Finance: { label: "Finance", color: "hsl(var(--warning))" },
};

const EmployeeExpenseReport = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("all");
  const [department, setDepartment] = useState("all");

  const filteredData = employeeData.filter((item) => {
    if (region !== "all" && item.region !== region) return false;
    if (department !== "all" && item.department !== department) return false;
    return true;
  });

  const totals = filteredData.reduce(
    (acc, item) => ({
      salary: acc.salary + item.salary,
      allowances: acc.allowances + item.allowances,
      bonus: acc.bonus + item.bonus,
      deductions: acc.deductions + item.deductions,
      netPay: acc.netPay + item.netPay,
    }),
    { salary: 0, allowances: 0, bonus: 0, deductions: 0, netPay: 0 }
  );

  const japanTotal = employeeData
    .filter((e) => e.region === "Japan")
    .reduce((acc, e) => acc + e.netPay, 0);
  const dubaiTotal = employeeData
    .filter((e) => e.region === "Dubai")
    .reduce((acc, e) => acc + e.netPay, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/reports")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Employee Expense Report
              </h1>
              <p className="text-muted-foreground mt-1">
                Salary and expense tracking for all employees by region
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-xl font-bold text-foreground">
                  {filteredData.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-xl font-bold text-success">
                  ${totals.netPay.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Japan Payroll</p>
                <p className="text-xl font-bold text-foreground">
                  ${japanTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dubai Payroll</p>
                <p className="text-xl font-bold text-foreground">
                  ${dubaiTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Breakdown */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Expense by Department
            </h3>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm text-muted-foreground">{dept.name}</span>
                  <span className="text-sm font-medium ml-auto">
                    ${dept.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Payroll Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Base Salaries</span>
                <span className="font-semibold">
                  ${totals.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Allowances</span>
                <span className="font-semibold text-success">
                  +${totals.allowances.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Bonuses</span>
                <span className="font-semibold text-success">
                  +${totals.bonus.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Deductions</span>
                <span className="font-semibold text-destructive">
                  -${totals.deductions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="font-semibold">Total Net Payroll</span>
                <span className="font-bold text-lg text-primary">
                  ${totals.netPay.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
              <SelectItem value="Dubai">Dubai</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employee Table */}
        <div
          className="rounded-xl border border-border bg-card animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead className="text-right">Allowances</TableHead>
                <TableHead className="text-right">Bonus</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead className="w-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        emp.region === "Japan"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-info/10 text-info border-info/20"
                      }
                    >
                      {emp.region}
                    </Badge>
                  </TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell className="text-right">
                    ${emp.salary.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-success">
                    +${emp.allowances.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-success">
                    +${emp.bonus.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    -${emp.deductions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${emp.netPay.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <ReportTableActions
                      itemId={emp.id}
                      itemName={emp.name}
                      onViewDetail={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      detailContent={
                        <div className="grid grid-cols-2 gap-4">
                          <DetailField label="Employee ID" value={emp.id} />
                          <DetailField label="Name" value={emp.name} />
                          <DetailField label="Role" value={emp.role} />
                          <DetailField label="Region" value={emp.region} />
                          <DetailField label="Department" value={emp.department} />
                          <DetailField label="Base Salary" value={`$${emp.salary.toLocaleString()}`} />
                          <DetailField label="Allowances" value={`+$${emp.allowances.toLocaleString()}`} />
                          <DetailField label="Bonus" value={`+$${emp.bonus.toLocaleString()}`} />
                          <DetailField label="Deductions" value={`-$${emp.deductions.toLocaleString()}`} />
                          <DetailField label="Net Pay" value={`$${emp.netPay.toLocaleString()}`} />
                        </div>
                      }
                      editContent={
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input defaultValue={emp.name} />
                          </div>
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Input defaultValue={emp.role} />
                          </div>
                          <div className="space-y-2">
                            <Label>Salary</Label>
                            <Input type="number" defaultValue={emp.salary} />
                          </div>
                          <div className="space-y-2">
                            <Label>Allowances</Label>
                            <Input type="number" defaultValue={emp.allowances} />
                          </div>
                          <div className="space-y-2">
                            <Label>Bonus</Label>
                            <Input type="number" defaultValue={emp.bonus} />
                          </div>
                          <div className="space-y-2">
                            <Label>Deductions</Label>
                            <Input type="number" defaultValue={emp.deductions} />
                          </div>
                        </div>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              {/* Totals Row */}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={5}>TOTAL</TableCell>
                <TableCell className="text-right">
                  ${totals.salary.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-success">
                  +${totals.allowances.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-success">
                  +${totals.bonus.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-destructive">
                  -${totals.deductions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${totals.netPay.toLocaleString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeExpenseReport;
