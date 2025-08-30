import { 
    Users, 
    Package, 
    TrendingUp, 
    DollarSign,
    ShoppingCart,
    Truck,
    BarChart3,
    Settings
} from 'lucide-react';

export const stats = [
    {
        title: "Total Customers",
        value: "1,234",
        change: "+12%",
        icon: Users,
        color: "text-primary"
    },
    {
        title: "Products in Stock",
        value: "567",
        change: "+5%",
        icon: Package,
        color: "text-green-600"
    },
    {
        title: "Monthly Revenue",
        value: "₹2.5M",
        change: "+18%",
        icon: DollarSign,
        color: "text-blue-600"
    },
    {
        title: "Orders This Month",
        value: "89",
        change: "+8%",
        icon: ShoppingCart,
        color: "text-orange-600"
    }
];

export const quickActions = [
    {
        title: "Add New Product",
        description: "Add a new product to inventory",
        icon: Package,
        href: "/admin/inventory"
    },
    {
        title: "View Orders",
        description: "Check and manage orders",
        icon: ShoppingCart,
        href: "/admin/orders"
    },
    {
        title: "Analytics",
        description: "View business analytics",
        icon: BarChart3,
        href: "/admin/analytics"
    },
    {
        title: "Settings",
        description: "Manage account settings",
        icon: Settings,
        href: "/admin/settings"
    }
];
