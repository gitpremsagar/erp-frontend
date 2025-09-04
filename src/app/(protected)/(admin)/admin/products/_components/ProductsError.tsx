import AdminHeader from "../../_components/AdminHeader";
import AdminSidebar from "../../_components/AdminSidebar";
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductsErrorProps {
  error: string;
}

export default function ProductsError({ error }: ProductsErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error loading products
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {error}
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
