
import AdminSidebar from "../../_components/AdminSidebar";

export default function StockLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded-lg w-48 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Actions Skeleton */}
            <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                
                {/* Table Rows */}
                {[...Array(8)].map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-12 gap-4 px-6 py-4 border-b last:border-b-0">
                    {[...Array(6)].map((_, colIndex) => (
                      <div key={colIndex} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-6 flex justify-center">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
