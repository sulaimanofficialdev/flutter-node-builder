import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Car, MoreHorizontal } from "lucide-react";
import { AddVehicleForm } from "@/components/forms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const vehicles = [
  {
    id: "VH-001",
    name: "Toyota Camry",
    year: 2019,
    auction: "Tokyo Auto Auction",
    purchaseDate: "2024-12-15",
    purchasePrice: 8500,
    status: "in_stock",
    location: "Japan Warehouse",
  },
  {
    id: "VH-002",
    name: "Honda Accord",
    year: 2020,
    auction: "Osaka Premier Auction",
    purchaseDate: "2024-12-14",
    purchasePrice: 9200,
    status: "dismantling",
    location: "Japan Workshop",
  },
  {
    id: "VH-003",
    name: "Nissan Altima",
    year: 2018,
    auction: "Yokohama Auction",
    purchaseDate: "2024-12-12",
    purchasePrice: 6800,
    status: "shipped",
    location: "Container CT-2024-089",
  },
  {
    id: "VH-004",
    name: "BMW 3 Series",
    year: 2021,
    auction: "Tokyo Premium Auto",
    purchaseDate: "2024-12-10",
    purchasePrice: 15500,
    status: "sold",
    location: "Dubai",
  },
  {
    id: "VH-005",
    name: "Mercedes C-Class",
    year: 2020,
    auction: "Nagoya Auction",
    purchaseDate: "2024-12-08",
    purchasePrice: 14200,
    status: "in_stock",
    location: "Japan Warehouse",
  },
];

const statusConfig = {
  in_stock: { label: "In Stock", className: "bg-success/10 text-success border-success/20" },
  dismantling: { label: "Dismantling", className: "bg-warning/10 text-warning border-warning/20" },
  shipped: { label: "Shipped", className: "bg-info/10 text-info border-info/20" },
  sold: { label: "Sold", className: "bg-primary/10 text-primary border-primary/20" },
};

const Vehicles = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
            <p className="text-muted-foreground mt-1">
              Manage vehicle purchases and auction records
            </p>
          </div>
          <AddVehicleForm />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search vehicles..." className="pl-10" />
          </div>
          <Button variant="secondary" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Vehicle Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12"></TableHead>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Auction</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle, index) => {
                const status = statusConfig[vehicle.status as keyof typeof statusConfig];
                return (
                  <TableRow
                    key={vehicle.id}
                    className="animate-slide-in-left"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Car className="w-4 h-4 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{vehicle.id}</TableCell>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell className="text-muted-foreground">{vehicle.auction}</TableCell>
                    <TableCell>{vehicle.purchaseDate}</TableCell>
                    <TableCell className="font-medium">${vehicle.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", status.className)}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{vehicle.location}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Start Dismantling</DropdownMenuItem>
                          <DropdownMenuItem>Add to Container</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Vehicles;
