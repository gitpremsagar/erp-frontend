
import AdminSidebar from "../../_components/AdminSidebar";
import { Button } from "@/components/ui/button";

interface StockErrorProps {
  error: string;
}

export default function StockError({ error }: StockErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50">
        
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-red-600">{error}</div>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
