'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from "../../_components/AdminSidebar";
import { Product } from "@/lib/types/products/Product.type";
import { DetailedStock } from "@/lib/types/stock/Stock.type";
import { Category } from "@/lib/types/categories/Category.type";
import { productServices } from "@/lib/services/productServices";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Calendar, User, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

export default function ProductStocksPage() {
  const params = useParams();
  const router = useRouter();
  const productCode = params.productCode as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [stocks, setStocks] = useState<DetailedStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate dummy stocks data
  const generateDummyStocks = (product: Product): DetailedStock[] => {
    const dummyStocks: DetailedStock[] = [];
    const currentDate = new Date();
    
    // Generate 3-5 dummy stock entries
    const stockCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < stockCount; i++) {
      const manufacturingDate = new Date(currentDate);
      manufacturingDate.setDate(manufacturingDate.getDate() - Math.floor(Math.random() * 90) - 30);
      
      const arrivalDate = new Date(manufacturingDate);
      arrivalDate.setDate(arrivalDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      const validityMonths = Math.floor(Math.random() * 12) + 6; // 6-18 months
      const expiryDate = new Date(manufacturingDate);
      expiryDate.setMonth(expiryDate.getMonth() + validityMonths);
      
      const stockQuantity = Math.floor(Math.random() * 100) + 10;
      
      dummyStocks.push({
        id: `stock-${i + 1}`,
        stockId: `STK-${product.productCode}-${String(i + 1).padStart(3, '0')}`,
        productId: product.id,
        manufacturingDate: manufacturingDate.toISOString(),
        arrivalDate: arrivalDate.toISOString(),
        validityMonths,
        expiryDate: expiryDate.toISOString(),
        supplierName: `Supplier ${String.fromCharCode(65 + i)}`,
        supplierId: `supplier-${i + 1}`,
        stockQuantity,
        isArchived: false,
        createdAt: arrivalDate.toISOString(),
        updatedAt: arrivalDate.toISOString(),
        product: product,
        StockRecord: []
      });
    }
    
    return dummyStocks.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // For now, we'll create a dummy product since we don't have a getProductByCode service
        // In a real implementation, you would call: const product = await productServices.getProductByCode(productCode);
        const dummyProduct: Product = {
          id: `product-${productCode}`,
          name: `Product ${productCode}`,
          mrp: Math.floor(Math.random() * 1000) + 100,
          productCode: productCode,
          lowStockLimit: 10,
          overStockLimit: 100,
          categoryId: 'cat-1',
          creatorId: 'user-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          description: 'Sample product description',
          grammage: 500,
          imageUrl: '/logo.jpeg',
          Category: {
            id: 'cat-1',
            name: 'Sample Category',
            description: 'Sample category description',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } as Category,
          ProductTagRelation: [],
          Stock: []
        };
        
        setProduct(dummyProduct);
        const dummyStocks = generateDummyStocks(dummyProduct);
        setStocks(dummyStocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
        toast.error('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    if (productCode) {
      fetchProduct();
    }
  }, [productCode]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                <p className="text-gray-600 mb-4">{error || 'The requested product could not be found.'}</p>
                <Button onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-gray-600">Product Code: {product.productCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>MRP: ₹{product.mrp.toLocaleString('en-IN')}</span>
                <span>Category: {product.Category?.name || 'N/A'}</span>
                <span>Total Stock Batches: {stocks.length}</span>
              </div>
            </div>

            {/* Stocks List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Stock Batches
                </h2>
                <p className="text-gray-600 mt-1">All stock entries for this product</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {stocks.map((stock) => (
                  <div key={stock.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {stock.stockId}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {stock.stockQuantity} units
                          </span>
                          {isExpired(stock.expiryDate) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expired
                            </span>
                          )}
                          {isExpiringSoon(stock.expiryDate) && !isExpired(stock.expiryDate) && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expiring Soon
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-gray-500">Manufactured</p>
                              <p className="font-medium">{formatDate(stock.manufacturingDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-gray-500">Arrived</p>
                              <p className="font-medium">{formatDate(stock.arrivalDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-gray-500">Expires</p>
                              <p className="font-medium">{formatDate(stock.expiryDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-gray-500">Supplier</p>
                              <p className="font-medium">{stock.supplierName}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {stocks.length === 0 && (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Stock Records</h3>
                  <p className="text-gray-600">No stock entries found for this product.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
